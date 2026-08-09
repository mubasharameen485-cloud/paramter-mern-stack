import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchDepartments, createDepartment, fetchEmployees, createEmployee } from './api';

export default function HRSystem() {
  const queryClient = useQueryClient();

  // 🏢 Department States
  const [deptName, setDeptName] = useState('');
  const [deptFloor, setDeptFloor] = useState('');
  
  // 👨‍💼 Employee States
  const [empName, setEmpName] = useState('');
  const [empSalary, setEmpSalary] = useState('');
  const [selectedDeptId, setSelectedDeptId] = useState(''); // Dropdown ID

  // --- QUERIES (Data laane ke liye) ---
  const { data: departments } = useQuery({ queryKey: ['departments'], queryFn: fetchDepartments });
  const { data: employees } = useQuery({ queryKey: ['employees'], queryFn: fetchEmployees });

  // --- MUTATIONS (Data bhejne ke liye) ---
  const deptMutation = useMutation({
    mutationFn: createDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries(['departments']);
      setDeptName('');
      setDeptFloor('');
    }
  });

  const empMutation = useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries(['employees']);
      setEmpName('');
      setEmpSalary('');
      setSelectedDeptId('');
    }
  });

  // --- HANDLERS ---
  const handleAddDepartment = (e) => {
    e.preventDefault();
    if (deptName) {
      deptMutation.mutate({ name: deptName, floor: Number(deptFloor) });
    }
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();
    if (!empName || !empSalary || !selectedDeptId) return alert("Fill all fields");
    
    // Backend schema demands: name, salary, department (id)
    empMutation.mutate({ 
      name: empName, 
      salary: Number(empSalary), 
      department: selectedDeptId 
    });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Company HR System (1:N Relation)</h1>

      <div style={{ display: 'flex', gap: '50px' }}>
        
        {/* ================= PART 1: ADD DEPARTMENT ================= */}
        <div style={{ border: '1px solid black', padding: '15px' }}>
          <h3>1. Add Department</h3>
          <form onSubmit={handleAddDepartment}>
            <input 
              type="text" placeholder="Department Name (e.g. IT)" 
              value={deptName} onChange={(e) => setDeptName(e.target.value)} style={{ display:'block', marginBottom:'5px' }} required
            />
            <input 
              type="number" placeholder="Floor No" 
              value={deptFloor} onChange={(e) => setDeptFloor(e.target.value)} style={{ display:'block', marginBottom:'5px' }}
            />
            <button type="submit" disabled={deptMutation.isPending}>Add Department</button>
          </form>
        </div>

        {/* ================= PART 2: ADD EMPLOYEE ================= */}
        <div style={{ border: '1px solid black', padding: '15px' }}>
          <h3>2. Add Employee</h3>
          <form onSubmit={handleAddEmployee}>
            <input 
              type="text" placeholder="Employee Name" 
              value={empName} onChange={(e) => setEmpName(e.target.value)} style={{ display:'block', marginBottom:'5px' }} required
            />
            <input 
              type="number" placeholder="Salary" 
              value={empSalary} onChange={(e) => setEmpSalary(e.target.value)} style={{ display:'block', marginBottom:'5px' }} required
            />
            
            {/* 🔗 RELATION DROPDOWN: Department Select Karega */}
            <select 
              value={selectedDeptId} 
              onChange={(e) => setSelectedDeptId(e.target.value)} 
              style={{ display:'block', marginBottom:'10px', width: '100%', padding: '5px' }} required
            >
              <option value="">-- Select Department --</option>
              {departments?.map(dept => (
                <option key={dept._id} value={dept._id}>
                  {dept.name} (Floor: {dept.floor})
                </option>
              ))}
            </select>

            <button type="submit" disabled={empMutation.isPending}>Add Employee</button>
          </form>
        </div>
      </div>

      <hr style={{ margin: '30px 0' }} />

      {/* ================= PART 3: DISPLAY EMPLOYEES WITH DEPARTMENT ================= */}
      <h3>All Employees List</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {employees?.map(emp => (
          <li key={emp._id} style={{ marginBottom: '15px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
            <strong>{emp.name}</strong> - Salary: ${emp.salary}
            <br />
            {/* Populated data yahan render ho raha hai */}
            <small style={{ color: 'green' }}>
              Department: {emp.department ? `${emp.department.name} (Floor ${emp.department.floor})` : 'No Department Assigned'}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
}