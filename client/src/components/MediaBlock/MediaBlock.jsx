import "./MediaBlock.css";

function MediaBlock({ side, title, children, img, alt, url }) {
  return (
    <div className={`media-block ${side}`}>
      <a target="blank" href={url}>
        {side === "left" && (
          <div className="media-block-img-div">
            <img src={img} alt={alt} />
          </div>
        )}
        <div>
          <div className="text-holder">
            <h3>{title}</h3>
            <p>{children}</p>
          </div>
        </div>
        {side === "right" && (
          <div className="media-block-img-div">
            <img src={img} alt={alt} />
          </div>
        )}
      </a>
    </div>
  );
}

export default MediaBlock;
