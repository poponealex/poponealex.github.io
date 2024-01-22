import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid'

const projects = [
  {
    name: 'rootmim',
    imageUrl: 'https://www.rootmim.org/logo.png',
    date: '2021 - present',
    url: 'https://www.rootmim.org',
  },
  {
    name: 'cert-manager-routes-controller',
    imageUrl: 'https://raw.githubusercontent.com/its4u/cert-manager-routes-controller/main/img/openshift-cert-manager-logo.png',
    date: '2023',
    url: 'https://github.com/its4u/cert-manager-routes-controller',
  },
  {
    name: 'Suprenam',
    imageUrl: 'https://raw.githubusercontent.com/poponealex/suprenam/master/img/logo_small.png',
    date: '',
    url: 'https://github.com/poponealex/suprenam',
  },
  {
    name: 'Collectif Poncelet',
    imageUrl: 'https://tailwindui.com/img/logos/48x48/reform.svg',
    date: '',
    url: '',
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  return (
    <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
      {projects.map((project) => (
        <li key={project.id} className="overflow-hidden rounded-xl border border-gray-200">
          <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
            <img
              src={project.imageUrl}
              alt={project.name}
              className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
            />
            <div className="text-sm font-medium leading-6 text-gray-900">{project.name}</div>
            <Menu as="div" className="relative ml-auto">
              <Menu.Button className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
                <span className="sr-only">Open options</span>
                <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-50' : '',
                          'block px-3 py-1 text-sm leading-6 text-gray-900'
                        )}
                      >
                        View<span className="sr-only">, {project.name}</span>
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-50' : '',
                          'block px-3 py-1 text-sm leading-6 text-gray-900'
                        )}
                      >
                        Edit<span className="sr-only">, {project.name}</span>
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-gray-500">Date</dt>
              <dd className="text-gray-700">
                <time>{project.date}</time>
              </dd>
            </div>
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-gray-500">URL</dt>
              <dd className="flex items-start gap-x-2">
                <div className="font-medium text-gray-900">{project.url}</div>
              </dd>
            </div>
          </dl>
        </li>
      ))}
    </ul>
  )
}
