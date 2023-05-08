interface NavItem {
  path: string,
  title: string,
  icon: string
 }

 const links: NavItem[] = [
  {
    path: 'alumnos',
    title: 'Alumnos',
    icon: 'person',
  },
  {
    path: 'cursos',
    title: 'Cursos',
    icon: 'school'
  },
  {
    path: 'inscripciones',
    title: 'Inscripciones',
    icon: 'assignment'
  }, 
  {
    path: 'usuarios',
    title: 'Usuarios',
    icon: 'supervised_user_circle'
  }
];

export default links;
