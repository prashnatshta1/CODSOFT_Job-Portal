import Salary from './Salary';

const ParentComponent = () => {
  const salaryRanges = [
    { label: '< 20,000', value: '20000' },
    { label: '20,000 - 50,000', value: '50000' },
    { label: '> 50,000', value: '50001' },
  ];

  const handleChange = (event) => {
    console.log('Selected Salary:', event.target.value);
  };

  const handleClick = (event) => {
    console.log('Salary Type:', event.target.value);
  };

  return <Salary handleChange={handleChange} handleClick={handleClick} salaryRanges={salaryRanges} />;
};

export default ParentComponent;
