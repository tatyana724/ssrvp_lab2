import React from "react";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { makeData } from "./makeData";

// needed for table body level scope DnD setup
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

// needed for row & cell level scope DnD setup  onClick={header.column.getToggleSortingHandler()}
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const DraggableTableHeader = ({ header }) => {
  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useSortable({
      id: header.column.id,
    });

  const style = {
    opacity: isDragging ? 0.8 : 1,
    position: "relative",
    transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
    transition: "width transform 0.2s ease-in-out",
    whiteSpace: "nowrap",
    width: header.column.getSize(),
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <th colSpan={header.colSpan} ref={setNodeRef} style={style}>
      {header.isPlaceholder
        ? null
        : flexRender(header.column.columnDef.header, header.getContext())}
      <button {...attributes} {...listeners}>
        🟰
      </button>
    </th>
  );
};

const DragAlongCell = ({ cell }) => {
  const { isDragging, setNodeRef, transform } = useSortable({
    id: cell.column.id,
  });

  const style = {
    opacity: isDragging ? 0.8 : 1,
    position: "relative",
    transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
    transition: "width transform 0.2s ease-in-out",
    width: cell.column.getSize(),
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <td style={style} ref={setNodeRef}>
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </td>
  );
};

function UserList() {
  const columns = React.useMemo(
    () => [
      {
        accessorKey: "firstName",
        cell: (info) => info.getValue(),
        id: "firstName",
        size: 150,
      },
      {
        accessorFn: (row) => row.lastName,
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
        id: "lastName",
        size: 150,
      },
      {
        accessorKey: "age",
        header: () => "Age",
        id: "age",
        size: 120,
      },
      {
        accessorKey: "visits",
        header: () => <span>Visits</span>,
        id: "visits",
        size: 120,
      },
      {
        accessorKey: "status",
        header: "Status",
        id: "status",
        size: 150,
      },
      {
        accessorKey: "progress",
        header: "Profile Progress",
        id: "progress",
        size: 180,
      },
    ],
    []
  );

  const [data, setData] = React.useState(() => makeData(20));
  const [columnOrder, setColumnOrder] = React.useState(() =>
    columns.map((c) => c.id)
  );

  const rerender = () => setData(() => makeData(20));

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnOrder,
    },
    onColumnOrderChange: setColumnOrder,
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  // reorder columns after drag & drop
  function handleDragEnd(event) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setColumnOrder((columnOrder) => {
        const oldIndex = columnOrder.indexOf(active.id);
        const newIndex = columnOrder.indexOf(over.id);
        return arrayMove(columnOrder, oldIndex, newIndex); //this is just a splice util
      });
    }
  }

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  return (
    // NOTE: This provider creates div elements, so don't nest inside of <table> elements
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToHorizontalAxis]}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <div className="p-2">
        <div className="h-4" />
        <div className="flex flex-wrap gap-2">
          <button onClick={() => rerender()} className="border p-1">
            Regenerate
          </button>
        </div>
        <div className="h-4" />
        <table>
          <thead>
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
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <SortableContext
                    key={cell.id}
                    items={columnOrder}
                    strategy={horizontalListSortingStrategy}
                  >
                    <DragAlongCell key={cell.id} cell={cell} />
                  </SortableContext>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </DndContext>
  );
}

export default UserList;










































function UserList() {
    const columns = useMemo(
      () => [
        {
          accessorKey: "id",
          id: "id",
          cell: (info) => info.getValue(),
          size: 150,
        },
        {
          accessorFn: (row) => row.login,
          id: "login",
          header: () => "login",
          cell: (info) => info.renderValue(),
          size: 400,
        },
        {
          accessorFn: (row) => row.role,
          id: "role",
          header: "role",
          size: 200,
        },
      ],
      []
    );
  
    const [data, setData] = useState([]);
    const parentElement = useRef(null);
    const [sorting, setSorting] = useState([]);
  
    const [columnOrder, setColumnOrder] = useState(() =>
      columns.map((c) => c.id)
    );
  
    const table = useReactTable({
      columns,
      data,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      onColumnOrderChange: setColumnOrder,
      state: {
  
        columnOrder,
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
  
    useEffect(() => {
      axios.get("http://localhost:3000/users").then((res) => {
        setData(res.data);
      });
    }, []);
    const count = data.length;
  
    const virtaulizer = useVirtualizer({
      count,
      getScrollElement: () => parentElement.current,
      estimateSize: () => 2,
    });
  
    if (data) {
      return (
        <DndContext
          collisionDetection={closestCenter}
          modifiers={[restrictToHorizontalAxis]}
          onDragEnd={handleDragEnd}
          sensors={sensors}
        >
          <Container className="list__container w-50 mt-3" ref={parentElement}>
            <p>
              <Link to="add">Добавить пользователя</Link>
            </p>
            <p>
              <Link to="delete">Удалить пользователя</Link>
            </p>
            <p>
              <Link to="delete">Отзывы</Link>
            </p>
  
            <div className="p-2">
              <Table
                style={{
                  position: "relative",
                  height: virtaulizer.getTotalSize(),
                  width: "100%",
                }}
              >
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      <SortableContext
                        items={columnOrder}
                        strategy={horizontalListSortingStrategy}
                      >
                        {headerGroup.headers.map((header) => {
                          return (
                            <DraggableTableHeader key={header.id} header={header} />
                          );
                        })}
                      </SortableContext>
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <SortableContext
                          key={cell.id}
                          items={columnOrder}
                          strategy={horizontalListSortingStrategy}
                        >
                          <DragAlongCell key={cell.id} cell={cell} />
                        </SortableContext>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Container>
        </DndContext>
      );
    }
  
    return <></>;
  }
  
  export default UserList;
  
