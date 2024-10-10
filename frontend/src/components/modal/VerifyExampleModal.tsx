import {useState} from "react";

export default function VerifyExampleModal() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [postInfo, setPostInfo] = useState<any>(null);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div>
            Hello
        </div>
    )
}