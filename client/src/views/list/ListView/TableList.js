import React from 'react';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};


export default function TableList(props) {
  const [state, setState] = React.useState({

    currList: {},
    isLoading: false,

    // listName: '',
    // columns: [
    //   { title: 'Name', field: 'name' },
    //   { title: 'Surname', field: 'surname' },
    //   { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
    //   {
    //     title: 'Birth Place',
    //     field: 'birthCity',
    //     lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
    //   },
    //   { 
    //     title: 'Availability',
    //     field: 'avalibility',
    //     lookup: { 20: 'Available', 40: 'Unavailable', 100: 'Unknown' },
    //   },
    // ],
    // data: [
    //   { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63, avalibility: 20, },
    //   {
    //     name: 'Zerya Betül',
    //     surname: 'Baran',
    //     birthYear: 2017,
    //     birthCity: 34,
    //     avalibility: 40,
    //   },
    //   {
    //     name: 'Samuel',
    //     surname: 'Okanume',
    //     birthYear: 2017,
    //     birthCity: 34,
    //     avalibility: 100,
    //   },
    // ],

  });

  const { propList, handleActive } = props.states;
  const { currList } = state;



  React.useEffect(() => {
    if(propList) {
      if(!state[propList._id]) {
        fetch('/api/import/' + propList._id)
        .then(res => res.json())
          .then(res => {
            console.log(res)
            const { err, lists } = res;
            const columns = [];
            if(err) {
              return console.log(err);
            }

            for (let tDataKey in lists.list[0]) {
                columns.push({title: tDataKey, field: tDataKey });
            }

            const listItems = { listName: lists.name, columns, data: lists.list };
            setState({ ...state, [lists._id]: listItems, currList: listItems }); // store the "list id" in state for later use to avoid api calls again.

          }).catch(err => console.log(err))
        
        setState({...state, isLoading: true })
      }
      else {
        setState({ ...state, currList: state[propList._id] });
      }
   }
  }, [propList]);


  const PostFilteredListItems = (data, name) => {

    fetch('/api/import/'+ propList._id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data })
    }).then(res => res.json())
      .then(res => {
        console.log(res);
        //setState({...state, check: true })
        // const { message, err } = res;
        // if(err) {
        //   console.log(err)
        //   return;
        // }
        // console.log(message);
      });
  }

  console.log(currList, 'storeListIds')

  return (
    <MaterialTable
      icons={tableIcons}
      title={ currList.listName }
      columns={ currList.columns }
      data={ currList.data }
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                ///const data = [...prevState.data];
                //const data = [...prevState[propList._id].data ];

                const { currList } = prevState;
                const data = [...currList.data ];

                data.push(newData);

                PostFilteredListItems(data);

                //return { ...prevState, data };
                //return { ...prevState, [propList._id]: { ...prevState[propList._id], data } };

                return {
                  ...prevState, 
                  currList: { ...currList, data },
                  [propList._id]: { ...prevState[propList._id], data },
                };

              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  ///const data = [...prevState.data];
                  const { currList } = prevState;
                  const data = [...currList.data ];

                  data[data.indexOf(oldData)] = newData;

                  PostFilteredListItems(data);
                  
                   //return { ...prevState, data };
                   return {
                    ...prevState, 
                    currList: { ...currList, data },
                    [propList._id]: { ...prevState[propList._id], data },
                  };

                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                ///const data = [...prevState.data];
                const { currList } = prevState;
                const data = [...currList.data ];

                data.splice(data.indexOf(oldData), 1);

                PostFilteredListItems(data);

                //return { ...prevState, data };
                return {
                  ...prevState, 
                  currList: { ...currList, data },
                  [propList._id]: { ...prevState[propList._id], data },
                };

              });
            }, 600);
          }),
      }}
    options={{
        selection: true
    }}
    actions={[
        {
            tooltip: 'Remove All Selected lists',
            icon: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
            onClick: (evt, deleteData) => {

              if (window.confirm('You want to delete ' + deleteData.length + ' rows')) {

                setState({ ...state, isLoading: true });

                setTimeout(() => {

                  setState((prevState) => {

                    const { currList } = prevState;
                    
                    const data = [...currList.data].filter(item => deleteData.indexOf(item) === -1); // filtering data to remove selected items
    
                    PostFilteredListItems(data);

                    return {
                      ...prevState, 
                      isLoading: false,
                      currList: { ...currList, data },
                      [propList._id]: { ...prevState[propList._id], data },
                    };

                  });

                }, 1000);
              }
            }
        }
    ]}

    isLoading={state.isLoading}

    />
  );
}
