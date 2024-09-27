import ConnectAccountBottomSheet from '@/components/(bottomsheet)/ConnectAccountBottomSheet';
import ConnectAccountContent from '@/components/(bottomsheet)/ConnectAccountContent';
import { BottomSheetProps } from '@/types/overlay/bottomsheet';

export default function AccountBottomSheet({
  isBottomSheetOpen,
  closeBottomSheet,
}: BottomSheetProps) {
  return (
    <section>
      <ConnectAccountBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={closeBottomSheet}
        height="400px"
      >
        <ConnectAccountContent />
      </ConnectAccountBottomSheet>
    </section>
  );
}
