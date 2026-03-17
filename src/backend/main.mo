import Array "mo:core/Array";
import Int "mo:core/Int";
import Iter "mo:core/Iter";
import List "mo:core/List";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  public type Profile = {
    name : Text;
    bio : Text;
    location : Text;
    skills : [Text];
    earnings : Nat;
    profileCompletion : Nat;
    profilePicture : ?Storage.ExternalBlob;
  };

  public type Course = {
    id : Text;
    title : Text;
    description : Text;
    category : Text;
    duration : Nat;
  };

  public type CourseProgress = {
    courseId : Text;
    progress : Nat;
    completed : Bool;
  };

  public type Product = {
    id : Text;
    title : Text;
    description : Text;
    price : Nat;
    category : Text;
    seller : Principal;
    image : ?Storage.ExternalBlob;
  };

  public type Post = {
    id : Text;
    author : Principal;
    content : Text;
    image : ?Storage.ExternalBlob;
    likes : Nat;
    createdAt : Time.Time;
  };

  public type Comment = {
    postId : Text;
    author : Principal;
    content : Text;
    createdAt : Time.Time;
  };

  public type Badge = {
    id : Text;
    name : Text;
    description : Text;
  };

  module Profile {
    public func compare(profile1 : Profile, profile2 : Profile) : Order.Order {
      switch (Text.compare(profile1.name, profile2.name)) {
        case (#equal) { Nat.compare(profile1.earnings, profile2.earnings) };
        case (order) { order };
      };
    };

    public func compareByLocation(profile1 : Profile, profile2 : Profile) : Order.Order {
      Text.compare(profile1.location, profile2.location);
    };
  };

  module Course {
    public func compare(course1 : Course, course2 : Course) : Order.Order {
      switch (Text.compare(course1.category, course2.category)) {
        case (#equal) { Nat.compare(course1.duration, course2.duration) };
        case (order) { order };
      };
    };

    public func compareByTitle(course1 : Course, course2 : Course) : Order.Order {
      Text.compare(course1.title, course2.title);
    };
  };

  module Product {
    public func compare(product1 : Product, product2 : Product) : Order.Order {
      switch (Text.compare(product1.category, product2.category)) {
        case (#equal) { Nat.compare(product1.price, product2.price) };
        case (order) { order };
      };
    };

    public func compareBySeller(product1 : Product, product2 : Product) : Order.Order {
      switch (Nat.compare(product1.price, product2.price)) {
        case (#equal) {
          Text.compare(product1.title, product2.title);
        };
        case (order) { order };
      };
    };

    public func compareByPrice(product1 : Product, product2 : Product) : Order.Order {
      switch (Nat.compare(product1.price, product2.price)) {
        case (#equal) {
          Text.compare(product1.title, product2.title);
        };
        case (order) { order };
      };
    };
  };

  module Post {
    public func compare(post1 : Post, post2 : Post) : Order.Order {
      switch (Int.compare(post1.createdAt, post2.createdAt)) {
        case (#equal) {
          Text.compare(post1.content, post2.content);
        };
        case (order) { order };
      };
    };

    public func compareByAuthor(post1 : Post, post2 : Post) : Order.Order {
      Nat.compare(post1.likes, post2.likes);
    };
  };

  public type DashboardStats = {
    enrolledCourses : Nat;
    completedCourses : Nat;
    productsListed : Nat;
    communityPosts : Nat;
    totalEarnings : Nat;
  };

  let profiles = Map.empty<Principal, Profile>();
  let courses = Map.empty<Text, Course>();
  let courseProgress = Map.empty<Principal, List.List<CourseProgress>>();
  let products = Map.empty<Text, Product>();
  let posts = Map.empty<Text, Post>();
  let comments = Map.empty<Text, List.List<Comment>>();
  let badges = Map.empty<Principal, List.List<Badge>>();

  // Stateful access control using Mixin. Combines the prefabricated library with your persistent actor state.
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Stateful storage using Mixin. Combines the prefabricated library with your persistent actor state.
  include MixinStorage();

  func validateProfile(caller : Principal) {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can manage profiles");
    };
  };

  public query ({ caller }) func getCallerUserProfile() : async ?Profile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    profiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?Profile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    profiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : Profile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    profiles.add(caller, profile);
  };

  public query ({ caller }) func getProfile(user : Principal) : async Profile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    switch (profiles.get(user)) {
      case (null) { Runtime.trap("Profile not found") };
      case (?profile) { profile };
    };
  };

  public shared ({ caller }) func createProfile(profile : Profile) : async () {
    validateProfile(caller);
    if (profiles.containsKey(caller)) {
      Runtime.trap("Profile already exists");
    };
    profiles.add(caller, profile);
  };

  public shared ({ caller }) func updateProfile(profile : Profile) : async () {
    validateProfile(caller);
    if (not profiles.containsKey(caller)) {
      Runtime.trap("Profile not found");
    };
    profiles.add(caller, profile);
  };

  public shared ({ caller }) func addCourse(id : Text, course : Course) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add courses");
    };
    if (courses.containsKey(id)) {
      Runtime.trap("Course already exists");
    };
    courses.add(id, course);
  };

  public query ({ caller }) func getCourses() : async [Course] {
    courses.values().toArray().sort();
  };

  public query ({ caller }) func getCoursesByTitle() : async [Course] {
    courses.values().toArray().sort(Course.compareByTitle);
  };

  public shared ({ caller }) func enrollInCourse(courseId : Text) : async () {
    validateProfile(caller);

    let progress = courseProgress.get(caller);
    let newProgress = {
      courseId;
      progress = 0;
      completed = false;
    };

    switch (progress) {
      case (null) {
        let list = List.empty<CourseProgress>();
        list.add(newProgress);
        courseProgress.add(caller, list);
      };
      case (?list) {
        list.add(newProgress);
      };
    };
  };

  public shared ({ caller }) func updateCourseProgress(courseId : Text, progress : Nat) : async () {
    validateProfile(caller);

    let userProgress = switch (courseProgress.get(caller)) {
      case (null) { List.empty<CourseProgress>() };
      case (?list) { list };
    };

    let updatedProgress = userProgress.map<CourseProgress, CourseProgress>(
      func(cp) {
        if (cp.courseId == courseId) {
          {
            courseId = cp.courseId;
            progress;
            completed = (progress == 100);
          };
        } else { cp };
      }
    );

    courseProgress.add(caller, updatedProgress);
  };

  public shared ({ caller }) func addProduct(id : Text, product : Product) : async () {
    validateProfile(caller);
    products.add(id, product);
  };

  public query ({ caller }) func getProducts() : async [Product] {
    products.values().toArray().sort();
  };

  public query ({ caller }) func getProductsBySeller() : async [Product] {
    products.values().toArray().sort(Product.compareBySeller);
  };

  public query ({ caller }) func getProductsByPrice() : async [Product] {
    products.values().toArray().sort(Product.compareByPrice);
  };

  public shared ({ caller }) func createPost(id : Text, content : Text, image : ?Storage.ExternalBlob) : async () {
    validateProfile(caller);
    let post : Post = {
      id;
      author = caller;
      content;
      image;
      likes = 0;
      createdAt = Time.now();
    };
    posts.add(id, post);
  };

  public query ({ caller }) func getPosts() : async [Post] {
    posts.values().toArray().sort();
  };

  public query ({ caller }) func getPostsByAuthor() : async [Post] {
    posts.values().toArray().sort(Post.compareByAuthor);
  };

  public shared ({ caller }) func likePost(postId : Text) : async () {
    validateProfile(caller);

    let post = switch (posts.get(postId)) {
      case (null) { Runtime.trap("Post not found") };
      case (?p) { p };
    };

    let updatedPost = {
      id = post.id;
      author = post.author;
      content = post.content;
      image = post.image;
      likes = post.likes + 1;
      createdAt = post.createdAt;
    };

    posts.add(postId, updatedPost);
  };

  public shared ({ caller }) func addComment(postId : Text, content : Text) : async () {
    validateProfile(caller);

    let comment : Comment = {
      postId;
      author = caller;
      content;
      createdAt = Time.now();
    };

    let postComments = switch (comments.get(postId)) {
      case (null) { List.empty<Comment>() };
      case (?list) { list };
    };

    postComments.add(comment);
    comments.add(postId, postComments);
  };

  public query ({ caller }) func getComments(postId : Text) : async [Comment] {
    let postComments = switch (comments.get(postId)) {
      case (null) { List.empty<Comment>() };
      case (?list) { list };
    };
    postComments.toArray();
  };

  public query ({ caller }) func getBadges() : async [Badge] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view badges");
    };
    let userBadges = switch (badges.get(caller)) {
      case (null) { List.empty<Badge>() };
      case (?list) { list };
    };
    userBadges.toArray();
  };

  public query ({ caller }) func getDashboardStats() : async DashboardStats {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view dashboard stats");
    };

    let userProfile = switch (profiles.get(caller)) {
      case (null) { Runtime.trap("Profile not found") };
      case (?profile) { profile };
    };

    let userCourses = switch (courseProgress.get(caller)) {
      case (null) { List.empty<CourseProgress>() };
      case (?courses) { courses };
    };

    let productsListed = products.size();
    let communityPosts = posts.size();

    var completedCourses = 0;
    userCourses.values().forEach(
      func(course) {
        if (course.completed) {
          completedCourses += 1;
        };
      }
    );

    let stats : DashboardStats = {
      enrolledCourses = userCourses.size();
      completedCourses;
      productsListed;
      communityPosts;
      totalEarnings = userProfile.earnings;
    };

    stats;
  };
};
