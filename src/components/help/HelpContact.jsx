function HelpContact() {
  return (
    <div className="bg-tl-subtle rounded-2xl px-8 py-6 flex items-center justify-between gap-6">
      <div>
        <p className="font-semibold text-tl-ink">Still need help?</p>
        <p className="text-sm text-tl-muted mt-1">
          Reach out and we'll get back to you as soon as we can.
        </p>
      </div>

      <a
        href="mailto:tutorlink.help@gmail.com"
        className="shrink-0 bg-tl-accent text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-tl-accent-hover transition"
      >
        Contact support
      </a>
    </div>
  );
}

export default HelpContact;