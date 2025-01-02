import React from "react";
import CategoryPill from "./CategoryPill";
import TagPills from "./TagPill";

export default function PropertyTile({
  image,
  title,
  description,
  categories,
  tags,
}) {
  return (
    <div
      key={property.id}
      className="flex flex-col justify-between align-middle border rounded-xl p-5 hover:bg-blue-950 hover:text-white hover:cursor-pointer space-y-2"
    >
      <div>
        {/* <Image src={`https://lo calhost:7000/${property.image}`} alt={property.title} width={100} height={100} /> */}
      </div>
      <h2 className="text-2xl capitalize">{property.title}</h2>
      <hr />
      <p>{property.description}</p>
      {categories.find((category) => category.id === property.category_id) && (
        <CategoryPill
          category={
            categories.find((category) => category.id === property.category_id)
              .name
          }
        />
      )}

      <div>{property.location}</div>
      <div>{property.price}</div>
      <div>{property.status}</div>
      <div>{property.user_id}</div>
      <TagPills tags={ProcessTags(property.tags)} />
    </div>
  );
}
