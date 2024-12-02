import { default as Projects } from "./components/ProjectList.jsx";
import { default as Divider } from "./components/Divider.jsx";

const socials = [
  {
    name: "GitHub",
    href: "https://www.github.com/poponealex",
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/aperlmutter",
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 20 20" {...props}>
        <path
          fillRule="evenodd"
          d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: "Email",
    href: "mailto:alexandre@perlmutter.tech",
    icon: (props) => (
      <svg
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        {...props}
      >
        <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <>
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-stone-400">
            perlmutter.tech
          </p>
          <div className="mt-8 flex items-center justify-center gap-x-10">
            {socials.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-500 hover:text-gray-400"
                target="_blank"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-8 w-8" aria-hidden="true" />
              </a>
            ))}
          </div>
          <img
            className="mt-16 inline-block h-32 w-32 rounded-full"
            src="/alexandre.jpg"
            alt="Kayak Slalom"
          />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Alexandre Perlmutter
          </h1>
          <h2 className="mt-6 text-2xl font-bold tracking-tight text-gray-800 sm:text-2xl">
           DevSecOps Engineer &amp; Software Developer &amp; Cybersecurity Enthusiast
          </h2>
          <h3 className="mt-8 text-xl font-bold tracking-tight text-gray-700 sm:text-xl">
            Currently working as a Cloud & DevOps Engineer in Luxembourg
          </h3>
          <h3 className="mt-4 text-xl font-bold tracking-tight text-gray-700 sm:text-xl">
            🛶 Kayak Slalom Athlete 🛶
          </h3>
        </div>
      </main>
      <Divider text="Projects" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 mb-12">
        <Projects />
        <div className="mx-auto max-w-3xl">{/* Content goes here */}</div>
      </div>
    </>
  );
}
