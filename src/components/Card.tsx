import { useEffect, useState } from "react";

export type CardData = {
  id: string,
  isClicked?: boolean,
  imageURL: string,
};

type SetIsClickedType = (id: string) => void;

type CardProps = CardData & { setIsClicked: SetIsClickedType; };

function Card({ id, imageURL, setIsClicked }: CardProps) {
  const [avatar, setAvatar] = useState<string>("");

  useEffect(() => {
    const fetchAvatar = async () => {
      const res = await fetch(imageURL);
      if (!res.ok) throw new Error("Error fetching avatar");
      const imgBlob = await res.blob();
      const imgObjectURL = URL.createObjectURL(imgBlob);
      setAvatar(imgObjectURL);
    };

    fetchAvatar();
  }, [imageURL, setAvatar]);

  return (
    <button className={`bg-(--col-2) aspect-2/3 rounded-lg p-2 lg:p-4 
                        text-left align-top border-b-12 border-(--col-3)
                        transition-transform duration-250 hover:scale-104 
                        scale-100`}
      onClick={() => setIsClicked(id)}>
      <img className="drop-shadow-[2px_2px_0_rgba(255,255,255,1)] drop-shadow-black"
        src={`${avatar}`}
        alt=""
      />
    </button>
  );
}

export { Card };