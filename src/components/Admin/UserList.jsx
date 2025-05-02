import { useState, useRef, useMemo } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Container, Spinner, Alert, Button, Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => 'users',
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'User', id })), 'User']
          : ['User'],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    addUser: builder.mutation({
      query: (userData) => ({
        url: 'users',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

const { useGetUsersQuery, useDeleteUserMutation, useAddUserMutation } = usersApi;

// Создаем мини-хранилище только для этого API
const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
});

// Оборачиваем компонент в Provider с нашим хранилищем
const UserListWithProvider = () => (
  <Provider store={store}>
    <UserList />
  </Provider>
);

const DraggableTableHeader = ({ header }) => {
  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useSortable({
      id: header.column.id,
    });

  const style = {
    opacity: isDragging ? 0.8 : 1,
    position: "relative",
    transform: CSS.Translate.toString(transform),
    transition: "width transform 0.2s ease-in-out",
    whiteSpace: "nowrap",
    width: header.column.getSize(),
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <th 
      colSpan={header.colSpan} 
      ref={setNodeRef} 
      style={style} 
      onClick={header.column.getToggleSortingHandler()}
      className="position-relative"
    >
      {header.isPlaceholder
        ? null
        : flexRender(header.column.columnDef.header, header.getContext())}
      <button 
        {...attributes} 
        {...listeners}
        className="drag-handle btn btn-sm btn-link"
      >
      </button>
      {header.column.getCanFilter() && (
        <div className="mt-2">
          <Form.Control
            size="sm"
            type="text"
            value={header.column.getFilterValue() || ''}
            onChange={e => header.column.setFilterValue(e.target.value)}
            placeholder={`Filter...`}
          />
        </div>
      )}
    </th>
  );
};

const VirtualRow = ({ row, virtualRow }) => {
  return (
    <tr
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        transform: `translateY(${virtualRow.start}px)`,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <td key={cell.id} style={{ width: cell.column.getSize() }}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  );
};

function UserList() {
  const { data: users = [], isLoading, isError, error, refetch } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        id: "id",
        header: "ID пользователя",
        cell: (info) => info.getValue(),
        size: 80, 
        minSize: 50,
        maxSize: 100, 
        filterFn: 'includesString',
      },
      {
        accessorKey: "login",
        id: "login",
        header: "Логин пользователя",
        cell: (info) => info.getValue(),
        size: 200,
        minSize: 150,
        maxSize: 300, 
        filterFn: 'includesString',
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <div className="d-flex gap-2">
            <Link to={`edit/${row.original.id}`} className="btn btn-sm btn-outline-primary">
              Редактировать
            </Link>
            <Button 
              variant="outline-danger" 
              size="sm"
              onClick={() => handleDelete(row.original.id)}
            >
              Удалить
            </Button>
          </div>
        ),
        size: 20, 
        minSize: 180, 
        maxSize: 250, 
      },
    ],
    []
  );

  const handleDelete = async (userId) => {
    if (window.confirm('Вы уверены, что хотите удалить этого пользователя?')) {
      try {
        await deleteUser(userId).unwrap();
      } catch (err) {
        console.error('Ошибка удаления:', err);
      }
    }
  };

  const parentRef = useRef(null);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnOrder, setColumnOrder] = useState(() => columns.map((c) => c.id));

  const table = useReactTable({
    columns,
    data: users,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnOrderChange: setColumnOrder,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    state: {
      columnOrder,
      columnFilters,
      sorting,
    },
    initialState: {
      pagination: {
        pageSize: 20,
      },
    },
  });

  function handleDragEnd(event) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setColumnOrder((columnOrder) => {
        const oldIndex = columnOrder.indexOf(active.id);
        const newIndex = columnOrder.indexOf(over.id);
        return arrayMove(columnOrder, oldIndex, newIndex);
      });
    }
  }
  
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  const { rows } = table.getRowModel();
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    overscan: 10,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();

  const paddingTop = virtualItems.length > 0 ? virtualItems[0]?.start || 0 : 0;
  const paddingBottom =
    virtualItems.length > 0
      ? totalSize - (virtualItems[virtualItems.length - 1]?.end || 0)
      : 0;

  if (isLoading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (isError) {
    return (
      <Container className="mt-3">
        <Alert variant="danger">
          Error loading data: {error.toString()}
        </Alert>
      </Container>
    );
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToHorizontalAxis]}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <Container className="mt-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Управление пользователями</h2>
          <Link to="add" className="btn btn-primary">
            Добавить пользователя
          </Link>
          <Link to="feedback" className="btn btn-primary">Отзывы   
          </Link>
        </div>

        <div
          ref={parentRef}
          className="border rounded"
          style={{
            height: '600px',
            overflow: 'auto',
          }}
        >
          <Table striped bordered hover className="mb-0">
            <thead className="bg-light sticky-top">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  <SortableContext
                    items={columnOrder}
                    strategy={horizontalListSortingStrategy}
                  >
                    {headerGroup.headers.map((header) => (
                      <DraggableTableHeader key={header.id} header={header} />
                    ))}
                  </SortableContext>
                </tr>
              ))}
            </thead>
            <tbody style={{ height: `${totalSize}px`, position: 'relative' }}>
              {paddingTop > 0 && (
                <tr>
                  <td style={{ height: `${paddingTop}px` }} />
                </tr>
              )}
              {virtualItems.map((virtualRow) => {
                const row = rows[virtualRow.index];
                return (
                  <VirtualRow 
                    key={row.id} 
                    row={row} 
                    virtualRow={virtualRow} 
                  />
                );
              })}
              {paddingBottom > 0 && (
                <tr>
                  <td style={{ height: `${paddingBottom}px` }} />
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <div className="d-flex gap-2 align-items-center">
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              «
            </Button>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              ‹
            </Button>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              ›
            </Button>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              »
            </Button>
          </div>
          <span className="mx-2">
            Page{' '}
            <strong>
              {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </strong>
          </span>
          <Form.Select
            value={table.getState().pagination.pageSize}
            onChange={e => {
              table.setPageSize(Number(e.target.value))
            }}
            style={{ width: 'auto' }}
            size="sm"
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </Form.Select>
        </div>
      </Container>
    </DndContext>
  );
}

export default UserListWithProvider;