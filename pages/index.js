import { Inter } from 'next/font/google'
import { BsFillMoonStarsFill } from 'react-icons/bs'
import { GiSittingDog } from 'react-icons/gi'
import { AiFillTwitterCircle, AiFillLinkedin, AiFillYoutube } from 'react-icons/ai'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [joke, setJoke] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const getJokeAndImage = async () => {
    const jokeResponse = await fetch('https://icanhazdadjoke.com/', {
      headers: {
        'Accept': 'application/json'
      }
    });
    const jokeData = await jokeResponse.json();
    setJoke(jokeData.joke);
  
    const imageResponse = await fetch('https://random.dog/woof.json?filter=mp4,webm,gif');
    const imageData = await imageResponse.json();
    const imageUrl = imageData.url;
    setImageUrl(null); 
    setTimeout(() => setImageUrl(imageUrl), 0); 
  };


  const handleImageLoad = (e) => {
    e.target.classList.remove('hidden');
    e.target.classList.add('pop-in');
  }

  return (
    <div>
      <title>Dad Joke Generator</title>
      <link rel="icon" href="/favicon.ico"></link>

      <main className="bg-white px-10">
        <section className="min-h-screen">
          <nav className="py-10 mb-12 flex justify-between">
            <h1 className="text-xl font-burtons">developedbyjacob</h1>
            <ul className="flex items-center">
              <li>
                <GiSittingDog className="cursor-pointer text-7xl" />
              </li>
            </ul>
          </nav>
          <div className="text-center p-10 py-10">
            <h2 className="text-5xl py-2 text-teal-600 font-medium">Live, Laugh, Bark!</h2>
            <h3 className="text-xl py-2">A Dog Joke Generator</h3>
            <div className="mt-8">
              <button onClick={getJokeAndImage} className="bg-gradient-to-r from-cyan-500 to-cyan-100 text-black px-4 py-5 rounded-md">
                Click to Laugh/Bark
              </button>
              {joke && <p className="text-lg mt-4 py-2">{joke}</p>}
              <div className="flex justify-center">
              {imageUrl && <img onLoad={handleImageLoad} className="mt-4 hidden" src={imageUrl} style={{maxWidth: "800px", maxHeight: "800px"}}/>}
              </div>
            </div>
          </div>
          <div className="text-center p-10">
            <p className="text-md py-5 leading-8 text-gray-800">
              This React app was created using the Next.js framework
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}