import React from 'react'
import { Link } from 'react-router-dom'
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AddIcon from '@mui/icons-material/Add';

const Sidebar = () => {
    return (
        <div className='p-12 flex flex-col gap-4'>
            <Link to='/admin/dashboard'>Dashboard</Link>
            {/* <Link to='/admin/dashboard'> */}
                <TreeView
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ImportExportIcon />}
                >
                    <TreeItem nodeId='1' label='products' >
                        <Link to='/admin/products'>
                            <TreeItem nodeId='2' label='All' icon={<PostAddIcon/>}/>
                        </Link>
                        <Link to='/admin/product'>
                            <TreeItem nodeId='3' label='Create' icon={<AddIcon/>}/>

                        </Link>
                    </TreeItem>

                </TreeView>
                {/* </Link> */}
                <Link to='/admin/orders'>
                    <p>Orders</p>
                </Link>
                <Link to='/admin/users'>
                    <p>Users</p>
                </Link>
                <Link to='/admin/reviews'>
                    <p>Reviews</p>
                </Link>
            
        </div>
    )
}

export default Sidebar