import "../nav.css";
export const TemplatePrompt = ({ onKeepLocal, onSaveToCloud, onDiscard }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">
        What would you like to do with the current resume?
      </h2>
      <div className="w-full flex justify-center">
        <button
          onClick={onKeepLocal}
          className="buttonChangeColor text-white px-4 py-2 rounded-lg mr-2"
        >
          Keep in Local Storage
        </button>
        <button
          onClick={onSaveToCloud}
          className="buttonChangeColor text-white px-4 py-2 rounded-lg mr-2"
        >
          Save to Cloud
        </button>
        <button
          onClick={onDiscard}
          className="buttonChangeColorRed text-white px-4 py-2 rounded-lg"
        >
          Discard
        </button>
      </div>
    </div>
  </div>
);
