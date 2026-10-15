function AlbumCardSkeleton() {
  return (
    <div className="bg-surface border border-line rounded-lg overflow-hidden animate-pulse">
      <div className="w-full aspect-square bg-line" />

      <div className="px-4 py-3">
        <div className="h-4 bg-line rounded w-3/4" />
        <div className="h-3 bg-line rounded w-1/2 mt-2" />
      </div>
    </div>
  );
}

export default AlbumCardSkeleton;