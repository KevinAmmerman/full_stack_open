import Content from './Content';
import Header from './Header';

const Course = ({ course }) => {
  return (
    <>
      <Header header={course.name} />
      <Content parts={course.parts} />
    </>
  );
};

export default Course;
