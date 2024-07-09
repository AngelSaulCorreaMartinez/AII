// test/example.test.mo
import Debug "mo:base/Debug";

actor {
  public func test_example() : async () {
    Debug.print("Test example running");
    assert (1 + 1 == 2);
  };
};