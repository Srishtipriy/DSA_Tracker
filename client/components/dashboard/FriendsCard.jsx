"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function FriendsCard() {
  const [name, setName] = useState("");
  const [leetcodeUrl, setLeetcodeUrl] = useState("");
  const [friends, setFriends] = useState([]);
  const [token, setToken] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");

      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, []);

  const fetchFriends = async () => {
    try {
      const res = await axios.get(
        "https://dsa-tracker-pixie15.vercel.app/api/friends",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const friendsWithStats = await Promise.all(
        res.data.map(async (friend) => {
          const statsRes = await axios.get(
            `https://dsa-tracker-pixie15.vercel.app/api/leetcode/${friend.leetcodeUsername}`
          );

          return {
            ...friend,
            stats: statsRes.data,
          };
        })
      );

      setFriends(friendsWithStats);
    } catch (error) {
      console.log(error);
    }
  };

  const addFriend = async () => {
    if (!name || !leetcodeUrl) {
      return alert("Please fill all fields");
    }

    try {
      await axios.post(
        "https://dsa-tracker-pixie15.vercel.app/api/friends/add",
        {
          name,
          leetcodeUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setName("");
      setLeetcodeUrl("");

      fetchFriends();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  const deleteFriend = async (id) => {
    try {
      await axios.delete(
        `https://dsa-tracker-pixie15.vercel.app/api/friends/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchFriends();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  const startEditing = (friend) => {
    setEditingId(friend._id);
    setEditName(friend.name);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditName("");
  };

  const saveEdit = async (id) => {
    if (!editName.trim()) {
      return alert("Friend name is required");
    }

    try {
      await axios.put(
        `https://dsa-tracker-pixie15.vercel.app/api/friends/${id}`,
        {
          name: editName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEditingId(null);
      setEditName("");

      fetchFriends();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  useEffect(() => {
    if (token) {
      fetchFriends();
    }
  }, [token]);

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4">
        Friends
      </h2>

      <input
        type="text"
        placeholder="Friend Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded w-full mb-3"
      />

      <input
        type="text"
        placeholder="LeetCode URL"
        value={leetcodeUrl}
        onChange={(e) => setLeetcodeUrl(e.target.value)}
        className="border p-2 rounded w-full mb-3"
      />

      <button
        onClick={addFriend}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Friend
      </button>

      <hr className="my-5" />

      <h3 className="font-bold mb-3">
        Friends List
      </h3>

      {friends.length === 0 ? (
        <p>No friends added yet.</p>
      ) : (
        friends.map((friend) => (
          <div
            key={friend._id}
            className="border rounded p-3 mb-3 flex justify-between items-center"
          >
            <div className="flex-1">
              {editingId === friend._id ? (
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) =>
                      setEditName(e.target.value)
                    }
                    className="border p-2 rounded"
                  />

                  <button
                    onClick={() => saveEdit(friend._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>

                  <button
                    onClick={cancelEditing}
                    className="bg-gray-500 text-white px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <h4 className="font-semibold mb-1">
                  {friend.name}
                </h4>
              )}

              <p>Username: {friend.leetcodeUsername}</p>

              <p>
                Total Solved: {friend.stats?.totalSolved}
              </p>

              <p>
                Easy: {friend.stats?.easySolved}
              </p>

              <p>
                Medium: {friend.stats?.mediumSolved}
              </p>

              <p>
                Hard: {friend.stats?.hardSolved}
              </p>

              <p>
                Ranking: {friend.stats?.ranking}
              </p>
            </div>

            <div className="flex gap-2 ml-4">
              {editingId !== friend._id && (
                <button
                  onClick={() => startEditing(friend)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
              )}

              <button
                onClick={() => deleteFriend(friend._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}