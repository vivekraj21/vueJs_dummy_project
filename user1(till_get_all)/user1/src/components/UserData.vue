<script>
import ky from 'ky';
const emptyjson = {};
async function getData() {
  try {
    const response = await ky.get('/api/users');
    const data = await response.json();
    return data.users;
  } catch (error) {
    return [];
  }
}

export { getData };
</script>


