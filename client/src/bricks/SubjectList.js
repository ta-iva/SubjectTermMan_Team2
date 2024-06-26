import React, { useState, useMemo } from "react";
import { Table, Navbar, Form, Button } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiMagnify, mdiPencil } from "@mdi/js";
import SubjectDetail from "./SubjectDetail";
import styles from "../styles/styles.css";

export default function SubjectList ({ subjectL, subjectTermL, assigmentL }) {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [searchBy, setSearchBy] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const filteredSubjectL = useMemo(() => {
    const filteredList = subjectL.filter((item) => {
      return (
        item.name.toLowerCase().includes(searchBy.toLowerCase()) ||
        item.supervisor.toLowerCase().includes(searchBy.toLowerCase()) ||
        item.goal.toLowerCase().includes(searchBy.toLowerCase())
      );
    });

    if (sortBy) {
      filteredList.sort((a, b) => {
        const x = sortBy === 'credits' ? a[sortBy] : a[sortBy].toLowerCase();
        const y = sortBy === 'credits' ? b[sortBy] : b[sortBy].toLowerCase();
    
        if (sortBy === 'credits') {
          return sortDirection === 'asc' ? x - y : y - x;
        } else {
          if (x < y) return sortDirection === 'asc' ? -1 : 1;
          if (x > y) return sortDirection === 'asc' ? 1 : -1;
          return 0;
        }
      });
    };

    return filteredList;
  }, [searchBy, sortBy, sortDirection, subjectL]);

  function handleSearch(event) { 
    event.preventDefault();
    setSearchBy(event.target["searchInput"].value);
  };

  function handleSearchDelete(event) {   
    if (!event.target.value) setSearchBy(""); 
  };

  function handleSort(sortKey) {
    if (sortKey === sortBy) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(sortKey);
      setSortDirection("asc");
    }
  };

return (

<div>
    <Navbar collapseOnSelect expand="sm" bg="light">
        <div className="container-fluid">
            <Navbar.Brand style={{fontSize: "100%"}}>Overview of subjects</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse style={{ justifyContent: "flex-end" }}>
              <Form className="d-flex" onSubmit={handleSearch}>
                <Form.Control
                  id={"searchInput"}
                  style={{ maxWidth: "150px" }}
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={handleSearchDelete}
                />
                <Button
                  style={{ marginRight: "8px" }}
                  variant="outline-success"
                  type="submit"
                >
                <Icon size={1} path={mdiMagnify} />
                </Button>
              </Form>         
            </Navbar.Collapse> 
        </div>
    </Navbar>
    
<div className="overview">
<Table striped bordered>
  <thead>
    <tr>
      <th onClick={() => handleSort("subjectId")}>ID</th>
      <th onClick={() => handleSort("name")}>Subject</th>
      <th onClick={() => handleSort("credits")}>Credits</th>
      <th onClick={() => handleSort("supervisor")}>Supervisor</th>
      <th onClick={() => handleSort("goal")}>Goal</th>
      <th>Detail</th>
    </tr>
  </thead>
  <tbody>
    {filteredSubjectL.map((subject, index) => {
      return (
        <tr key={index} onClick={() => setSelectedSubject(subject)}>
          <td> {subject.subjectId} </td>
          <td> {subject.name} </td>
          <td> {subject.credits} </td>
          <td> {subject.supervisor} </td>
          <td> {subject.goal} </td>
          <td>          
            <Icon size={0.8} 
              path={mdiPencil } 
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedSubject(subject)}
            />
          </td>
        </tr>  
      );
    })}
  </tbody>
</Table>
  </div>
  {selectedSubject && (
    <SubjectDetail
      subjDetail={selectedSubject}
      subjectTermL={subjectTermL}
      assigmentL={assigmentL}
      onClose={() => setSelectedSubject(null)}
    />
  )}
</div>
);
};