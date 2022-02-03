import React from 'react'
import '@testing-library/react'
import {render} from '@testing-library/react'
import Sidebar from "../components/Admin/Sidebar/Sidebar"
import { MemoryRouter } from 'react-router-dom';

test('renders content', ()=>{
    const view = render(<MemoryRouter><Sidebar /></MemoryRouter>)
    console.log(view)
})