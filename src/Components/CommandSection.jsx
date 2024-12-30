const CommandSection = ({ section }) => (
  <section className="mb-5">
    <div className="relative mb-8">
      <h2 className="text-3xl font-semibold text-white p-2">{section.sectionTitle}</h2>
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500" />
    </div>
    <div className="text-base grid grid-cols-1 lg:grid-cols-2 gap-2 items-stretch">
      {section.commands.map((command, index) => (
        <div key={index} className="group rounded-lg shadow-md flex flex-col h-full">
          <div className="flex flex-col sm:flex-row items-stretch h-full">
            <div className="sm:w-2/5 p-3 bg-gray-700 font-normal flex items-center justify-center">
              <code className="text-green-400 font-bold">{command.command}</code>
            </div>
            <div className="sm:w-3/5 p-3 bg-gray-600 flex items-center">
              <p className="text-white font-bold text-left">{command.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default CommandSection;