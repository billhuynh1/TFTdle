type AtlasIconProps = {
  col: number; // column index (0-based)
  row: number; // row index (0-based)
  size?: number; // size in px you want to render (default = 64)
  atlasSize?: number; // total size of atlas image (default = 512)
  iconSize?: number; // individual icon size (default = 64)
  imageUrl?: string; // path to your atlas
};

const AtlasIcon = ({
  col,
  row,
  size,
  atlasSize,
  iconSize,
  imageUrl,
}: AtlasIconProps) => {
  return (
    <div
      style={{
        width: `${iconSize}px`,
        height: `${iconSize}px`,
        backgroundImage: `url(${imageUrl})`,
        backgroundPosition: `-${col * iconSize}px -${row * iconSize}px`,
        backgroundSize: `512px`,
        imageRendering: "auto", // important for crisp icons
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

export default AtlasIcon;
