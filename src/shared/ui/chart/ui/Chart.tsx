export function Chart() {
  return (
    <section>
      <div className="max-w-sm w-full bg-zinc-100 border rounded-2xl p-4 md:p-6">
        <div className="flex justify-between mb-4 md:mb-6">
          <div className="flex items-center">
            <div className="flex justify-center items-center">
              <h5 className="text-xl font-semibold text-heading me-1">Your team's progress</h5>
            </div>
          </div>
        </div>

        <div className="bg-neutral-secondary-medium border border-light-medium p-3 rounded-base">
          <div className="grid grid-cols-3 gap-3 mb-3">
            <dl className="bg-brand-softer border border-brand-subtle text-fg-brand-strong rounded-base flex flex-col items-center justify-center h-16">
              <dt className="w-8 h-8 rounded-full bg-brand-soft text-fg-brand-strong text-sm font-medium flex items-center justify-center mb-1">
                12
              </dt>
              <dd className="text-fg-brand text-sm font-medium">To do</dd>
            </dl>
            <dl className="bg-warning-soft border border-warning-subtle text-fg-warning rounded-base flex flex-col items-center justify-center h-16">
              <dt className="w-8 h-8 rounded-full bg-warning-medium text-fg-warning text-sm font-medium flex items-center justify-center mb-1">
                23
              </dt>
              <dd className="text-fg-warning text-sm font-medium">In progress</dd>
            </dl>
            <dl className="bg-success-soft border border-success-subtle text-fg-success-strong rounded-base flex flex-col items-center justify-center h-16">
              <dt className="w-8 h-8 rounded-full bg-success-medium text-fg-success-strong text-sm font-medium flex items-center justify-center mb-1">
                64
              </dt>
              <dd className="text-fg-success-strong text-sm font-medium">Done</dd>
            </dl>
          </div>
        </div>

        <div className="py-6" id="radial-chart"></div>

        <div className="grid grid-cols-1 items-center border-light border-t justify-between">
          <div className="flex justify-between items-center pt-4 md:pt-6">
            <button
              id="dropdownLastDays6Button"
              data-dropdown-toggle="LastDays6dropdown"
              data-dropdown-placement="bottom"
              className="text-sm font-medium text-body hover:text-heading text-center inline-flex items-center"
              type="button"
            >
              Last 7 days
              <svg
                className="w-4 h-4 ms-1.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 9-7 7-7-7"
                />
              </svg>
            </button>

            <div
              id="LastDaysdropdown"
              className="z-10 hidden bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-44"
            >
              <ul
                className="p-2 text-sm text-body font-medium"
                aria-labelledby="dropdownLastDaysButton"
              >
                <li>
                  <a
                    href="#"
                    className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                  >
                    Yesterday
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                  >
                    Today
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                  >
                    Last 7 days
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                  >
                    Last 30 days
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
