// import logo from '../../logo.svg';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import './Table.css'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

import { useTable, useFilters, usePagination } from 'react-table'
import { Badge  } from 'react-bootstrap';


function checkColumnValue(v){
  if(v.props.cell.value == "Expired"){
    return true
  }else{
    return false
  }
}

function Table(props) {
  // const meta = props.meta
  // const data = props.data
  props.meta.forEach((item, i) => {
    if(item.accessor == "filename"){
      item["Cell"] = ({ cell: { value } }) => (
        <img
          src={value}
          width={60}
        />
      )
    }
  });

  const data = React.useMemo(
     () => props.data,
     [props.data]
   )
   const columns = React.useMemo(
     () => props.meta,
     []
   )

  //  const defaultColumn = React.useMemo(
  //   () => ({
  //     // Let's set up our default Filter UI
  //     Filter: DefaultColumnFilter,
  //   }),
  //   []
  // )

  const {
     getTableProps,
     getTableBodyProps,
     headerGroups,
     prepareRow,
     page,
     canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      state: { pageIndex, pageSize },
   } = useTable({ columns, data, initialState: { pageIndex: 0 } }, usePagination)
  return (<>
    <div class="row">
    <div class="col-md-12">
    <div class="table-wrap">
    <table {...getTableProps()} class="table">
   <thead class="thead-custom">
     {headerGroups.map(headerGroup => (
       <tr {...headerGroup.getHeaderGroupProps()}>
         {headerGroup.headers.map(column => (
           <th
             {...column.getHeaderProps()}

           >
             {column.render('Header')}
           </th>
         ))}
       </tr>
     ))}
   </thead>
   <tbody {...getTableBodyProps()}>
     {(page.length > 0 && page.map(row => {
       prepareRow(row)
       return (
         <tr {...row.getRowProps()}>
           {row.cells.map((cell,idx) => {
             return (
               <td
                 {...cell.getCellProps()}

               >
                 {idx == 4 ? [ (checkColumnValue(cell.render('Cell')) ? <Badge variant="danger"> {cell.render('Cell')} </Badge> : <Badge variant="success"> {cell.render('Cell')} </Badge> )] : cell.render('Cell') }
               </td>
             )
           })}
         </tr>
       )
     })) || <div style={{textAlign:"center"}}>No record found....</div> }
   </tbody>
  </table>
  </div>
  </div>
  </div>

  <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}

      </div>
    </>
  );
}

export default Table;
