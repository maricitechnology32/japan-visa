import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { AlertCircle, CheckCircle, Clock, FileText, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateStudentStatus } from '../../features/students/studentSlice';

// Column Definitions
const COLUMNS = {
  lead: { id: 'lead', title: 'Leads (Inquiry)', color: 'bg-purple-100 text-purple-700', icon: AlertCircle },
  draft: { id: 'draft', title: 'Processing (Draft)', color: 'bg-blue-100 text-blue-700', icon: FileText },
  submitted: { id: 'submitted', title: 'Submitted', color: 'bg-amber-100 text-amber-700', icon: Clock },
  verified: { id: 'verified', title: 'Verified / Visa', color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle },
  rejected: { id: 'rejected', title: 'Rejected', color: 'bg-red-100 text-red-700', icon: XCircle },
};

export default function KanbanBoard() {
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.students);
  const [boardData, setBoardData] = useState({ lead: [], draft: [], submitted: [], verified: [], rejected: [] });

  // 1. Sync Redux students to Kanban Columns
  useEffect(() => {
    if (students) {
      const newBoard = { lead: [], draft: [], submitted: [], verified: [], rejected: [] };
      students.forEach(student => {
        const status = student.profileStatus || 'lead';
        if (newBoard[status]) {
            newBoard[status].push(student);
        }
      });
      setBoardData(newBoard);
    }
  }, [students]);

  // 2. Handle Drag & Drop
  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    // Dropped outside or same place
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    // OPTIMISTIC UPDATE (UI moves instantly)
    const sourceColumn = [...boardData[source.droppableId]];
    const destColumn = [...boardData[destination.droppableId]];
    const [movedStudent] = sourceColumn.splice(source.index, 1);
    
    // Update local state immediately for smooth UX
    const newBoard = { ...boardData };
    newBoard[source.droppableId] = sourceColumn;
    
    // Only add to destination if different column
    if (source.droppableId !== destination.droppableId) {
        // Update the student object itself locally
        const updatedStudent = { ...movedStudent, profileStatus: destination.droppableId };
        destColumn.splice(destination.index, 0, updatedStudent);
        newBoard[destination.droppableId] = destColumn;
        
        // DISPATCH API CALL
        dispatch(updateStudentStatus({ id: draggableId, status: destination.droppableId }));
    } else {
        // Reordering same column (just UI)
        destColumn.splice(destination.index, 0, movedStudent);
        newBoard[source.droppableId] = destColumn;
    }

    setBoardData(newBoard);
  };

  return (
    <div className="h-[calc(100vh-200px)] overflow-x-auto overflow-y-hidden">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-6 h-full min-w-[1200px] p-2">
          {Object.values(COLUMNS).map((column) => (
            <div key={column.id} className="flex flex-col w-80 bg-slate-50 rounded-xl border border-slate-200 shadow-sm h-full max-h-full">
              
              {/* Column Header */}
              <div className={`p-4 border-b border-slate-100 flex justify-between items-center ${column.color} bg-opacity-20 rounded-t-xl`}>
                <div className="flex items-center gap-2 font-bold">
                    <column.icon size={18} />
                    {column.title}
                </div>
                <span className="bg-white/50 px-2 py-0.5 rounded text-xs font-bold">
                    {boardData[column.id]?.length || 0}
                </span>
              </div>

              {/* Droppable Area */}
              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`p-3 flex-1 overflow-y-auto custom-scrollbar transition-colors ${snapshot.isDraggingOver ? 'bg-slate-100' : ''}`}
                  >
                    {boardData[column.id]?.map((student, index) => (
                      <Draggable key={student._id} draggableId={student._id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`bg-white p-4 mb-3 rounded-lg border shadow-sm hover:shadow-md transition-all group
                                ${snapshot.isDragging ? 'rotate-2 scale-105 ring-2 ring-emerald-400 z-50' : 'border-slate-200'}
                            `}
                            style={provided.draggableProps.style}
                          >
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold text-slate-800 text-sm">
                                    {student.personalInfo.firstName} {student.personalInfo.lastName}
                                </h4>
                                {student.visaDetails?.intake && (
                                    <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                                        {student.visaDetails.intake}
                                    </span>
                                )}
                            </div>
                            
                            <div className="text-xs text-slate-500 space-y-1">
                                <p className="truncate">{student.personalInfo.email}</p>
                                <p className="flex items-center gap-1">
                                    {student.personalInfo.phone || 'No Phone'}
                                </p>
                            </div>

                            <div className="mt-3 pt-3 border-t border-slate-50 flex justify-between items-center">
                                <div className="text-[10px] text-slate-400 font-medium">
                                    {new Date(student.createdAt).toLocaleDateString()}
                                </div>
                                <div className="h-6 w-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[10px] font-bold">
                                    {student.personalInfo.firstName[0]}
                                </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}