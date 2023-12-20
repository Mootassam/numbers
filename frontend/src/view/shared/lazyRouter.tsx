import React from "react";

export default function lazyRouter(opts) {
  const LazyLoading = React.lazy(opts.loader);
  return (props) => (
    <React.Suspense fallback="Loading ...">
      <LazyLoading {...props} />
    </React.Suspense>
  );
}
