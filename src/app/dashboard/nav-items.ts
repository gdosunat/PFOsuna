interface NavItem {
  path: string,
  title: string,
  icon: string,
  roles: string[]
 }

 const links: NavItem[] = [
  {
    path: 'alumnos',
    title: 'Alumnos',
    icon: 'person',
    roles: ['admin', 'usuario']
  },
  {
    path: 'cursos',
    title: 'Cursos',
    icon: 'school',
    roles: ['admin', 'usuario']
  },
  {
    path: 'inscripciones',
    title: 'Inscripciones',
    icon: 'assignment',
    roles: ['admin', 'usuario']
  },
  {
    path: 'usuarios',
    title: 'Usuarios',
    icon: 'supervised_user_circle',
    roles: ['admin']
  }
];

export default links;
