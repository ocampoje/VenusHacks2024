import React, { useState, useEffect } from 'react';
import Page2 from './Page2'; // Adjust the path if necessary

function ParentComponent() {
  const [lectures, setLectures] = useState([]);

  // Fetch lectures from API or set them from local state
  useEffect(() => {
    // Fetch or set lectures here
    const fetchedLectures = [
      {
        _id: "66524d7dc0ab0d354c539791",
        name: "Example 1 Lecture",
      },
      {
        _id: "66524dbcc0ab0d354c539792",
        name: "Example 2 Lecture",
      },
      // Add more lectures as needed
    ];
    setLectures(fetchedLectures);
  }, []); // Make sure to adjust dependencies based on your actual implementation

  return (
    <div>
      <Page2 lectures={lectures} />
      {/* Render other components */}
    </div>
  );
}

export default ParentComponent;
