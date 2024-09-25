export const count = async(list) => {
    console.log('Input list:', list);
    
    const counters = {
      applied: 0,
      interviewing: 0,
      accepted: 0,
      rejected: 0,
    };
  
    await list.forEach((data) => {
      if (data.status === "applied") {
        counters.applied++;
      } else if (data.status === "interviewing") {
        counters.interviewing++;
      } else if (data.status === "accepted") {
        counters.accepted++;
      } else if (data.status === "rejected") {
        counters.rejected++;
      }
    });
  
    return counters;
  };
  

  