let upstream =
      https://github.com/dfinity/vessel-package-set/releases/download/mo-0.11.1-20240411/package-set.dhall
        sha256:3898b1cb55eddc69be8edf5c5edae6c4e12032382ae762dcda42fee30cd9cc5b

let additions =
      https://github.com/dfinity/motoko-base/archive/refs/tags/mo-0.11.1.tar.gz
        sha256:7ffdf9d72f2e4f2fdb7c43b2b64c64df2b98e6a0c1c32d9fbb27d2be9f30e110

in  upstream // additions
