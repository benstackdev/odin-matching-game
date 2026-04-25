import { useEffect, useState } from "react";

export type CardData = {
  id: string,
  isClicked: boolean;
  imageURL: string,
};

type SetIsClickedType = (id: string) => void;

type CardProps = CardData & { setIsClicked: SetIsClickedType; };

function Card({ id, isClicked, imageURL, setIsClicked }: CardProps) {
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
    <button className={`bg-(--col-blue)
            aspect-2/3 rounded-lg p-4 text-left align-top`}
      onClick={() => setIsClicked(id)}>
      <img src={`${avatar}`} alt="" />
    </button>
  );
}

export { Card };