export default function SearchSection() {
  return (
    <section className="w-[80%] mx-auto">
      <div className="flex flex-col space-y-5">
        <h1 className="text-4xl">YonnPix</h1>
        <p>Image search website</p>
        <div>
          powered by{' '}
          <button
            onClick={() => window.open('https://unsplash.com')}
            className="text-blue-500 duration-150 hover:opacity-70 hover:underline"
          >
            Unsplash.com
          </button>
        </div>
      </div>
    </section>
  );
}
