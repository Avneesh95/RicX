const StatCard = ({ title, value }) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-xl">
      <h2 className="text-gray-300">{title}</h2>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
};

export default StatCard;