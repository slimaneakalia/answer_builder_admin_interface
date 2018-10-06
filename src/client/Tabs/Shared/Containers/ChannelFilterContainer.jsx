import React from "react";
import SearchFilter from "_shared/Components/SearchFilter";

const data = {
  WEB: { Channel_label: "WEB", selected: false },
  TWITTER: { Channel_label: "TWITTER", selected: true }
};

const updateFilter = e => {
  console.log("New update channel event was detected !");
  console.log(e);
};

const constants = {
  label: "Filter by channel",
  textkey: "Channel_label"
};

const ChannelFilterContainer = () => (
  <SearchFilter updateFilter={updateFilter} data={data} {...constants} />
);

export default ChannelFilterContainer;
