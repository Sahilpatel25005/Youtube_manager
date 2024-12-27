import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [idEdit, setidEdit] = useState(false);
  const [newname, setNewname] = useState("");
  const [newid, setNewid] = useState(0);
  const [newtime, setNewtime] = useState();

  const apiCall = async (endpoint, method = "GET", body = null) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;

    try {
      const options = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (body) {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(`${baseUrl}${endpoint}`, options);

      if (!response.ok) {
        throw new Error("API call failed");
      }

      if (response.status !== 204) {
        return await response.json(); // Return JSON data if any
      }

      return null; // Handle cases where no response body is expected
    } catch (error) {
      console.error("Error in API call:", error);
      throw error; // Rethrow the error for further handling
    }
  };

  async function list() {
    try {
      const result = await apiCall("/listdata", "GET");
      setData(result);
    } catch (error) {
      alert("data is not fetching....");
    }
  }

  useEffect(() => {
    list();
  }, []);

  async function add() {
    try {
      await apiCall("/addvideo", "POST", { name: newname, time: newtime });
      list();
      setNewname("");
      setNewtime("");
    } catch {
      alert("Failed to add video...");
    }
  }

  async function deleteItem(id) {
    try {
      await apiCall("/deletevideo", "DELETE", { id: id });
      setData((prev) => prev.filter((item) => item.id !== id));
    } catch {
      alert("Failed to delete video...");
    }
  }

  async function update() {
    try {
      await apiCall("/updatevideo", "PUT", {
        id: newid,
        name: newname,
        time: newtime,
      });
      list();
      setNewname("");
      setNewtime("");
    } catch {
      alert("Failed to update video...");
    }
  }

  const edit = (id) => {
    setidEdit(true);
    const dt = data.find((item) => item.id === id);
    if (dt !== undefined) {
      setNewid(id);
      setNewname(dt.name);
      setNewtime(dt.time);
    }
  };

  const save = () => {
    if (idEdit) {
      update();
    } else {
      add();
    }
  };

  return (
    <>
      <div className="flex justify-center items-center mt-9 flex-col gap-6 p-3 w-[100%]">
        <h1 className="text-5xl">VIDEO LIST</h1>
        <div className="flex gap-4">
          <input
            className=" border-2 p-2"
            type="text"
            value={newname}
            onChange={(e) => setNewname(e.target.value)}
            placeholder="enter name"
          />
          <input
            className=" border-2 p-2"
            type="text"
            value={newtime}
            onChange={(e) => setNewtime(e.target.value)}
            placeholder="enter time"
          />
          <button
            className={`py-1 px-2  text-white rounded-md ${
              idEdit ? "bg-green-500" : "bg-blue-600"
            }`}
            onClick={() => save()}
          >
            {idEdit ? "Save" : "Add"}
          </button>
        </div>

        {data.map((item) => (
          <div
            className="flex gap-4 bg-pink-500 p-3 rounded-md w-[50%] justify-around items-center"
            key={item.id}
          >
            <p>{item.id}</p>
            <p className="bg-pink-500"> {item.name} </p>
            <p className="bg-pink-500"> {item.time} </p>
            <div className="flex gap-3">
              <button
                className="py-1 px-2 bg-red-600 text-white rounded-md"
                onClick={() => deleteItem(item.id)}
              >
                Delete
              </button>
              <button
                className="py-1 px-2 bg-blue-800 text-white rounded-md"
                onClick={() => edit(item.id)}
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
