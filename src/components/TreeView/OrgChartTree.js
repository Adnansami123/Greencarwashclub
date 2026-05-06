import Tree from 'react-d3-tree';
import React, { Component, useContext, useEffect, useState } from "react";
import { useGetUserTreeMutation, useUsersMutation } from '../../store/ConfigurationAPI/ConfigurationAPI';
import { setLoadingModalConfiguration } from '../../store/Slices/ModalLoaderSlice';
import { useDispatch } from 'react-redux';
import { filterUserPurchaseTree, insertNode } from '../../utils';
import AuthContext from '../../store/authentication/auth-context';
import { Card, Col, Row } from 'antd';
// This is a simplified example of an org chart with a depth of 2.
// Note how deeper levels are defined recursively via the `children` property.
// const orgChart = {
//   name: 'Head',
//   children: [
//     {
//       name: 'Manager',
//       attributes: {
//         department: 'Production',
//       },
//       children: [
//         {
//           name: 'Foreman',
//           attributes: {
//             department: 'Fabrication',
//           },
//           children: [
//             {
//               name: 'Worker',
//             },
//           ],
//         },
//         {
//           name: 'Foreman',
//           attributes: {
//             department: 'Assembly',
//           },
//           children: [
//             {
//               name: 'Left Worker',
//             },
//             {
//               name: 'Right Worker',

//             },

//           ],
//         },
//       ],
//     },
//   ],
// };
// const orgChart = {
//   name: "Head",
//   children: [
//     {
//       pid: 0,
//       userXid: 10021,
//       leftUserXid: 10027,
//       rightUserXid: 10028,
//       leftCount: null,
//       rightCount: null,
//       name: "1",

//     },
//     {
//       pid: 0,
//       userXid: 10025,
//       leftUserXid: 10026,
//       rightUserXid: 10029,
//       leftCount: null,
//       rightCount: null,
//       name: "2",

//     }
//   ]
// }

export default function OrgChartTree() {

  const dispatch = useDispatch();
  const [data, setData] = useState();
  const authCtx = useContext(AuthContext);

  const [
    fetch,
    {
      data: getData,
      isSuccess: isAssetsSuccess,
    },
  ] = useGetUserTreeMutation();

  useEffect(
    function Users() {
      dispatch(setLoadingModalConfiguration({ isVisible: true }));
      fetch({
        id: authCtx.clientID,
      });

    }, [fetch]);

  useEffect(() => {
    // const convertToOrgChart = (apiResponse) => {
    //   const lookup = {};
    //   const root = { name: 'Head', children: [] };

    //   apiResponse.forEach(node => {
    //     lookup[node.userXid] = { ...node, children: [] };
    //   });

    //   apiResponse.forEach(node => {
    //     if (node.userXid === 1) {
    //       root.children.push(lookup[node.leftUserXid], lookup[node.rightUserXid]);
    //     } else {
    //       const parent = lookup[node.userXid];
    //       parent.children.push(lookup[node.leftUserXid], lookup[node.rightUserXid]);
    //     }
    //   });

    //   return root;
    // };

    const convertToOrgChart = (apiResponse) => {

      console.log("Auth", authCtx.clientID);
      const lookup = {};
      const root = { name: "You", children: [] };
      if (apiResponse.length == 1 && apiResponse[0].leftUserXid == Number(authCtx.clientID)) {
        return root;
      }

      // Create a lookup dictionary for easy access
      apiResponse.forEach((node) => {
        lookup[node.leftUserXid] = {
          //name: node.leftUserXid, children: []
          name: node.leftUserName, children: []

        };
        lookup[node.rightUserXid] = {
          //name: node.rightUserXid, children: []
          name: node.rightUserName, children: []
        };
      });

      apiResponse.forEach((node) => {
        const leftChild = lookup[node.leftUserXid];
        const rightChild = lookup[node.rightUserXid];
        console.log("rightChild", rightChild);
        if (node.userXid === Number(authCtx.clientID)) {
          if (!!rightChild.name) {
            root.children.push(leftChild, rightChild);
          }
          else {
            root.children.push(leftChild);
          }

        }
        else {
          const parent = lookup[node.userXid];
          console.log("rightChildrightChild", parent);
          //  if (!!parent?.children[1]?.name) {
          parent.children.push(leftChild, rightChild);
          // }else
          // {
          //   parent.children.push(leftChild);
          // }
        }
      });

      return root;
    };



    if (!!getData) {

      console.log("convertToOrgChart", convertToOrgChart(getData));
      setData(convertToOrgChart(getData));

    }
  }, [getData]);









  useEffect(() => {
    if (isAssetsSuccess) {
      dispatch(setLoadingModalConfiguration({ isVisible: false }));
    }
    // if (!!getData) {
    //   // console.log("filterDatafilterData", filterUserPurchaseTree({ ledgerData: getData }));


    //   var array = [8, 10, 12, 5, 3, 6],
    //     tree = array.reduce((t, v) => t ? insertNode(t, v) : new Node(v), null);
    //   //  setData(filterUserPurchaseTree({ ledgerData: getData }));
    //   return;
    //   // var data = [8, 10, 12, 5, 3, 6],
    //   //   tree;



    //   // tree = data.reduce(insertBinTree, void 0);

    //   console.log("filterUserPurchaseTreefilterUserPurchaseTree", tree);
    //   setData(tree);
    // }
  }, [isAssetsSuccess])





  // useEffect(() => {
  //   function getData() {
  //     setData(orgChart);
  //   }

  // }, [])
  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>

            <Card bordered={false}
              className="criclebox tablespace mb-24"
              title="Downline Members">
              <div id="treeWrapper" style={{ width: '150em', height: '20em' }}>
                {!!data && (
                  <Tree orientation='Vertical' data={!!data ? data : null}
                    rootNodeClassName="node__root"
                    branchNodeClassName="node__branch"
                    leafNodeClassName="node__leaf" />
                )}
              </div>
            </Card>
          </Col>
        </Row>

      </div>
    </>
  );
}