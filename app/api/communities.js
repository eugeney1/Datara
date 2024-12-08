// pages/api/communities.js

let usersCommunities = {}; // Simulating a database where users' joined communities are stored

export default function handler(req, res) {
  const { method } = req;
  const { userId, community } = req.body;

  switch (method) {
    case "GET":
      // Return all available communities
      const communities = [
        "r/YourCommunity1",
        "r/YourCommunity2",
        "r/YourCommunity3",
        "r/YourCommunity4",
      ];
      return res.status(200).json({ communities });

    case "POST":
      // Join or leave a community
      if (!usersCommunities[userId]) {
        usersCommunities[userId] = [];
      }

      const userCommunities = usersCommunities[userId];

      // Toggle community join/leave
      if (userCommunities.includes(community)) {
        usersCommunities[userId] = userCommunities.filter((comm) => comm !== community);
        return res.status(200).json({ message: "Left community", joined: false });
      } else {
        usersCommunities[userId].push(community);
        return res.status(200).json({ message: "Joined community", joined: true });
      }

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
