import NavBar from "@/components/common/NavBar";
import PhonePreview from "@/components/phonePreview";

export default function ProtectedPageLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="py-5">
      {/* Include shared UI here e.g. a header or sidebar */}

      <NavBar />

      <div className="grid grid-cols-12 gap-4 mt-5">
        {/* Left Side - Hidden on small screens */}
        <div className="hidden lg:block md:col-span-0 lg:col-span-5 xl:col-span-4 bg-white p-4 rounded-2xl">
          <PhonePreview />
        </div>

        {/* Right Side - Full width on small screens and 16 columns on medium and larger screens */}
        <div className="col-span-12 md:col-span-12 lg:col-span-7 xl:col-span-8 bg-white p-4 rounded-2xl">
          {children}
        </div>
      </div>
    </section>
  );
}
