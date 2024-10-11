import NavBar from "@/components/common/NavBar";

export default function ProtectedPageLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="container border h-[100vh] py-5">
      {/* Include shared UI here e.g. a header or sidebar */}

      <NavBar />

      <div className="grid grid-cols-12 gap-4 mt-5">
        {/* Left Side - Hidden on small screens */}
        <div className="hidden md:block md:col-span-4 bg-white p-4 rounded-2xl">Preview</div>

        {/* Right Side - Full width on small screens and 16 columns on medium and larger screens */}
        <div className="col-span-24 md:col-span-8 bg-white p-4 rounded-2xl">{children}</div>
      </div>
    </section>
  );
}
