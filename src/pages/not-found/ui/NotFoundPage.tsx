import { Link } from 'react-router';

function NotFoundPage() {
  return (
    <section
      className="border-border bg-surface text-foreground flex max-h-6/12 flex-col gap-3 rounded-3xl border p-5 font-['Segoe_UI_Variable_Display','Trebuchet_MS','Verdana','Tahoma',sans-serif] shadow-(--app-shadow) md:justify-items-start"
      aria-labelledby="not-found-title"
    >
      <p className="text-danger m-0 text-[clamp(2rem,5vw,3.5rem)] leading-none font-black tracking-[0.03em]">
        404
      </p>
      <h2 className="m-0 text-[clamp(1.3rem,2.2vw,2rem)]">Page not found</h2>
      <p className="m-0 max-w-[48ch] leading-6">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        className="bg-background text-foreground inline-flex min-h-10 items-center justify-center rounded-md border px-3.5 text-sm font-bold transition-[transform,border-color,box-shadow] duration-180 ease-in-out hover:-translate-y-px hover:border-rose-700/50 hover:shadow-[0_10px_18px_-14px_rgb(190_24_93/0.9)] md:w-auto"
        to="/"
      >
        Back to dashboard
      </Link>
    </section>
  );
}

export { NotFoundPage };
