import Footer from "./footer";

const EditResume = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex max-h-screen overflow-hidden w-full">
      {children}
      <Footer />
    </div>
  );
};

export default EditResume;
