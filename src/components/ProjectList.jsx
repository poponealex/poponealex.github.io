import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import { default as Alert } from "./AlertWIP.jsx";

import { useState } from "react";

const projects = [
  {
    name: "{rootmim}",
    short_description: "Ethical hacking and cybersecurity training platform",
    imageUrl: "/logo-rootmim.png",
    link: { short: "rootmim.org", url: "https://www.rootmim.org" },
    kind: "Fullstack hacking platform",
    stack: "Express.js, React, Docker, C, OpenVPN, SQL, Bash, Linux, Proxmox",
  },
  {
    name: "cert-manager-routes-controller",
    kind: "RHOCP controller",
    short_description:
      "An Openshift controller to integrate cert-manager with OpenShift Routes",
    imageUrl: "/logo-cert-manager-routes-controller.png",
    link: {
      short: "its4u/cert-manager-routes-controller",
      url: "https://github.com/its4u/cert-manager-routes-controller",
    },
    stack: "Rust, RHOCP, Helm",
  },
  {
    name: "Suprenam",
    kind: "App",
    short_description:
      "It's Suprenam, a batch renaming utility which relies on the tool you know best: your text editor",
    imageUrl: "/logo-suprenam.png",
    link: {
      short: "poponealex/suprenam",
      url: "https://github.com/poponealex/suprenam",
    },
    stack: "Python",
  },
  {
    name: "Collectif Poncelet",
    kind: "Website",
    short_description:
      "A neighborhood civil rights association that aims to protect the residents of downtown Metz",
    imageUrl: "/logo-cp.png",
    link: {
      short: "collectifponcelet.fr",
      url: "https://www.collectifponcelet.fr",
    },
    stack: "Rust, React",
  },
  {
    name: "La Chambre À Côté",
    kind: "Website",
    short_description:
      "High-end, comfortable apartments in the heart of the magnificent city of Metz!",
    imageUrl: "/logo-lcac.png",
    link: {
      short: "lachambreacote.fr",
      url: "https://www.lachambreacote.fr",
    },
    stack: "Wordpress",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [show, setShow] = useState(false);
  return (
    <>
    <div className="mb-8">
    {show && (<Alert
      message="Project's page under development!"
      setShow={setShow}
    />)}
    </div>
    <ul
      role="list"
      className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
    >
      
      {projects.map((project) => (
        <li
          key={project.id}
          className="overflow-hidden rounded-xl border border-gray-200"
        >
          <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
            <img
              src={project.imageUrl}
              alt={project.name}
              className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
            />
            <div>
              <p className="text-sm font-medium leading-6 text-gray-900">
                <a 
                href="#/"
                onClick={() => setShow(true)}>
                  {project.name}
                </a>
              </p>
              <p className="text-xs font-medium leading-6 text-gray-600">
                {project.short_description}
              </p>
            </div>
            <Menu as="div" className="relative ml-auto">
              <Menu.Button className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
                <span className="sr-only">Open options</span>
                <EllipsisHorizontalIcon
                  className="h-5 w-5"
                  aria-hidden="true"
                />
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
                        onClick={() => setShow(true)}
                        href="#/"
                        className={classNames(
                          active ? "bg-gray-50" : "",
                          "block px-3 py-1 text-sm leading-6 text-gray-900"
                        )}
                      >
                        View<span className="sr-only">, {project.name}</span>
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-gray-500">Kind</dt>
              <dd className="flex items-start gap-x-2">
                <div className="font-medium text-gray-900">{project.kind}</div>
              </dd>
            </div>
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-gray-500">Stack</dt>
              <dd className="flex items-start gap-x-2">
                <div className="font-medium text-gray-900">{project.stack}</div>
              </dd>
            </div>
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-gray-500">Link</dt>
              <dd className="flex items-start gap-x-2">
                <div className="font-medium text-gray-900">
                  <a href={project.link.url} target="_blank">
                    {project.link.short}
                  </a>
                </div>
              </dd>
            </div>
          </dl>
        </li>
      ))}
    </ul>
    </>
  );
}
