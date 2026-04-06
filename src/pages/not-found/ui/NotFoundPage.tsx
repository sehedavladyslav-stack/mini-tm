import { Link } from 'react-router';

function NotFoundPage() {
  return (
    <section
      className="grid max-w-155 justify-items-stretch gap-2.5 rounded-3xl border border-zinc-200 bg-white p-[clamp(20px,3vw,36px)] font-['Segoe_UI_Variable_Display','Trebuchet_MS','Verdana','Tahoma',sans-serif] md:justify-items-start"
      aria-labelledby="not-found-title"
    >
      <p className="m-0 text-[clamp(2rem,5vw,3.5rem)] leading-none font-black tracking-[0.03em] text-rose-700">
        404
      </p>
      <h2 id="not-found-title" className="m-0 text-[clamp(1.3rem,2.2vw,2rem)]">
        Page not found
      </h2>
      <p className="m-0 max-w-[48ch] leading-6 text-zinc-600">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        className="inline-flex min-h-10 w-full items-center justify-center rounded-xl border border-zinc-300 bg-white px-3.5 text-[0.92rem] font-bold text-zinc-800 no-underline transition-[transform,border-color,box-shadow] duration-180 ease-in-out hover:-translate-y-px hover:border-rose-700/50 hover:shadow-[0_10px_18px_-14px_rgb(190_24_93_/_0.9)] md:w-auto"
        to="/"
      >
        Back to dashboard
      </Link>
    </section>
  );
}

export { NotFoundPage };
