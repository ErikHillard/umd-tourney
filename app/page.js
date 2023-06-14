import Image from 'next/image'

export const metadata = {
  title: 'My Page Title',
  description: 'This is the main page'
}

export default function Home() {
  return (
    <div>
      <main>
        <ul className="list-disc list-inside">
          <li>HI</li>
          <li>Why</li>
        </ul>
      </main>
    </div>
  )
}
