import { Meteor } from "meteor/meteor";
import { Counts } from "meteor/tmeasday:publish-counts";
import { Templates } from "/lib/collections";
import { Reaction } from "/server/api";

//
// Security
// import "/server/security/collections";
// Security definitions
//
Security.permit(["insert", "update", "remove"]).collections([
  Templates
]).ifHasRole({
  role: "admin",
  group: Reaction.getShopId()
});

Meteor.publish("Templates", () => {
  // Check shopId
  const shopId = Reaction.getShopId();
  if (!shopId) {
    return this.ready();
  }

  // appends a count to the collection
  // we're doing this for use with griddleTable
  Counts.publish(this, "templates-count", Templates.find(
    shopId
    // select,
    // options
  ));

  return Templates.find({
    shopId
  });
});
