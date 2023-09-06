import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'

export default function PostDropdown(blogpost, deleteBlopost) {

  return (
    <Menu>
      <Menu.Button>More</Menu.Button>
      <Menu.Items>
        <Menu.Item>
          {({ active }) => (
            <Link to={`/updatepost/${blogpost._id}`}>
            <button
              className={`${active && 'bg-blue-500'}`}
            >
              Edit
            </button>
            </Link>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button className='opacity-75' onClick={deleteBlopost}>Delete</button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  )
}
