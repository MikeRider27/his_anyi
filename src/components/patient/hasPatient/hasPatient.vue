<template>
  <div class="hasPatient">
    <h1 class="listing-page-title">Expedientes de pacientes</h1>
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="Palabra clave" style="width:195px;"></el-input>
      <el-select v-model="listQuery.select" placeholder="Tipo de búsqueda" style="width:150px;">
        <el-option label="Nombre" value="1"></el-option>
        <el-option label="Médico responsable" value="2"></el-option>
        <el-option label="Fecha" value="3"></el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" @click="handleSearch">Buscar</el-button>
      <el-button type="primary" icon="el-icon-edit" @click="handleCreate">Añadir</el-button>
      <el-button type="primary" icon="el-icon-delete" @click="handleDelAll">Eliminar seleccionados</el-button>
      <el-button type="primary" @click="handleDownload"><i class="el-icon-document el-icon--left"></i>Exportar</el-button>
    </div>
    <el-table :data="tableData" border style="width:100%;" @selection-change="handleSelectionChange">
      <el-table-column type="selection"></el-table-column>
      <el-table-column type="expand" width="52" class-name="patient-expand-control">
        <template slot-scope="props">
          <div class="patient-record-details">
            <div><strong>Fecha de alta del expediente:</strong><span>{{ props.row.date }}</span></div>
            <div><strong>Nombre del paciente:</strong><span>{{ props.row.name }}</span></div>
            <div><strong>Procedencia del paciente:</strong><span>{{ props.row.region }}</span></div>
            <div><strong>Número de DNI:</strong><span>{{ props.row.idCard }}</span></div>
            <div><strong>Edad del paciente:</strong><span>{{ props.row.age }}</span></div>
            <div><strong>Contacto:</strong><span>{{ props.row.phone }}</span></div>
            <div><strong>Sexo del paciente:</strong><span>{{ props.row.sex }}</span></div>
            <div><strong>Dirección:</strong><span>{{ props.row.address }}</span></div>
            <div><strong>Nombre del contacto:</strong><span>{{ props.row.Name }}</span></div>
            <div><strong>Teléfono del contacto:</strong><span>{{ props.row.Phone }}</span></div>
            <div><strong>Relación paciente-contacto:</strong><span>{{ props.row.relation }}</span></div>
            <div><strong>Síntomas:</strong><span>{{ props.row.symptoms }}</span></div>
            <div><strong>Antecedentes:</strong><span>{{ props.row.illHistory }}</span></div>
            <div><strong>Departamento:</strong><span>{{ props.row.disease }}</span></div>
            <div><strong>Médico responsable:</strong><span>{{ props.row.doctor }}</span></div>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label='N.º'>
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label="Fecha" prop="date" min-width="120"></el-table-column>
      <el-table-column label="Nombre" prop="name" min-width="150" show-overflow-tooltip></el-table-column>
      <el-table-column label="Sexo" prop="sex" width="90"></el-table-column>
      <el-table-column label="Edad" prop="age" width="80"></el-table-column>
      <el-table-column label="Médico responsable" prop="doctor" min-width="160" show-overflow-tooltip></el-table-column>
      <el-table-column label="Acciones" width="190" align="center" class-name="patient-actions-column">
        <template slot-scope="scope">
          <div class="patient-row-actions">
            <el-button size="mini" icon="el-icon-edit" @click="handleEdit(scope.$index,scope.row)">Editar</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)">Eliminar</el-button>
          </div>
        </template>
     </el-table-column>
    </el-table>
    <!-- Add form -->
    <el-dialog title="Alta en formulario" :visible.sync="dialogFormVisible" custom-class="app-dialog" append-to-body>
      <el-form class="small-space" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="Fecha">
          <el-input v-model="temp.date"></el-input>
        </el-form-item>
        <el-form-item label="Nombre">
          <el-input v-model="temp.name"></el-input>
        </el-form-item>
        <el-form-item label="Sexo">
          <el-input v-model="temp.sex"></el-input>
        </el-form-item>
        <el-form-item label="Edad">
          <el-input v-model="temp.age"></el-input>
        </el-form-item>
        <el-form-item label="Médico responsable">
          <el-input v-model="temp.doctor"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancelar</el-button>
        <el-button type="primary" @click="handleCreateSubmit">Aceptar</el-button>
      </div>
    </el-dialog>
    <!-- Edit form -->
    <el-dialog title="Formulario de edición" :visible.sync="dialogFormEditVisible" custom-class="app-dialog" append-to-body>
      <el-form class="small-space" :model="Edit" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="Fecha de alta del expediente">
          <el-input v-model="Edit.date"></el-input>
        </el-form-item>
        <el-form-item label="Nombre del paciente">
          <el-input v-model="Edit.name"></el-input>
        </el-form-item>
        <el-form-item label="Procedencia del paciente">
          <el-input v-model="Edit.region"></el-input>
        </el-form-item>
        <el-form-item label="Número de DNI">
          <el-input v-model="Edit.idCard"></el-input>
        </el-form-item>
        <el-form-item label="Edad del paciente">
          <el-input v-model="Edit.age"></el-input>
        </el-form-item>
        <el-form-item label="Contacto">
          <el-input v-model="Edit.phone"></el-input>
        </el-form-item>
        <el-form-item label="Sexo del paciente">
          <el-input v-model="Edit.sex"></el-input>
        </el-form-item>
        <el-form-item label="Dirección">
          <el-input v-model="Edit.address"></el-input>
        </el-form-item>
        <el-form-item label="Nombre del contacto">
          <el-input v-model="Edit.Name"></el-input>
        </el-form-item>
        <el-form-item label="Teléfono del contacto">
          <el-input v-model="Edit.Phone"></el-input>
        </el-form-item>
        <el-form-item label="Relación paciente-contacto">
          <el-input v-model="Edit.relation"></el-input>
        </el-form-item>
        <el-form-item label="Síntomas">
          <el-input v-model="Edit.symptoms"></el-input>
        </el-form-item>
        <el-form-item label="Antecedentes">
          <el-input v-model="Edit.illHistory"></el-input>
        </el-form-item>
        <el-form-item label="Departamento">
          <el-input v-model="Edit.disease"></el-input>
        </el-form-item>
        <el-form-item label="Médico responsable">
         <el-input v-model="Edit.doctor"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormEditVisible = false">Cancelar</el-button>
        <el-button type="primary" @click="handleEditSubmit">Aceptar</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
import {api} from '../../../global/api.js';
import Vue from 'vue';
export default {
  data () {
    return {
      tableData: [],
      listQuery: {
        select: '',
        title: ''
      },
      temp: {
        date: '',
        name: '',
        sex: '',
        age: '',
        doctor: ''
      },
      Edit: [],
        // date: '',
        // name: '',
        // region: '',
        // idCard: '',
        // age: '',
        // phone: '',
        // sex: '',
        // address: '',
        // Name: '',
        // Phone: '',
        // relation: '',
        // symptoms: '',
        // illHistory: '',
        // disease: '',
        // doctor: ''
      // },
      dialogFormEditVisible: false,
      dialogFormVisible: false,
      multipleSelection: []
    };
  },
  created () {
    let vm = this;
    Vue.http.get(api.patientList).then(function (response) {
      // me.tableData = response.data.tableData;
      vm.tableData = response.data.tableData;
    }, function (response) {
      vm.$message.error('No se pudo cargar la lista de pacientes. Inténtalo de nuevo más tarde.');
    });
  },
  methods: {
    handleSearch () {
      let me = this;
      me.$http.get(api.patientList1, {params: {name: me.listQuery.title}}).then(function (response) {
        // me.tableData = response.data.tableData;
        me.tableData = response.data.tableData;
      }, function (response) {
        me.$message.error('No se pudo realizar la búsqueda. Inténtalo de nuevo más tarde.');
      });
    },
    handleEdit (index, row) {
      this.dialogFormEditVisible = true;
      this.Edit = row;// Shallow copy
      // this.Edit = JSON.parse(JSON.stringify(row));
      // Deep copy
    },
    handleEditSubmit () {
      this.Edit;
      this.dialogFormEditVisible = false;
    },
    handleDelete (index, row) {
      var vm = this;
      vm.tableData.splice(index, 1);
    },
    handleCreate () {
      this.dialogFormVisible = true;
    },
    handleCreateSubmit () {
      var vm = this;
      vm.tableData
      .push(vm.temp);
      this.dialogFormVisible = false;
      this.temp = {
        date: '',
        name: '',
        sex: '',
        age: '',
        doctor: ''
      };
    },
    handleDelAll () {
      var vm = this;
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    handleDownload () {
      var vm = this;
      import('@/vendor/Export2Excel').then(({ export_json_to_excel }) => {
        const tHeader = ['Fecha', 'Nombre', 'Sexo', 'Dirección', 'Teléfono de contacto', 'Edad', 'Médico responsable'];
        const filterVal = ['date', 'name', 'sex', 'address', 'phone', 'age', 'doctor'];
        const tableData = vm.tableData;
        const data = vm.formatJson(filterVal, tableData);
        export_json_to_excel(tHeader, data, 'Lista exportadaexcel');
      });
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    }
  }
};

</script>
<style type="text/css">
  .hasPatient .patient-expand-control .el-table__expand-icon {
    width: 24px;
    height: 24px;
    border: 1px solid #d5e0e7;
    border-radius: 50%;
    color: #167d77;
    transform: none;
  }
  .hasPatient .patient-expand-control .el-icon-arrow-right {
    display: none;
  }
  .hasPatient .patient-expand-control .el-table__expand-icon::before {
    content: "+";
    font-size: 18px;
    font-weight: 600;
    line-height: 20px;
  }
  .hasPatient .patient-expand-control .el-table__expand-icon--expanded::before {
    content: "−";
  }
  .hasPatient .patient-record-details {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px 20px;
    padding: 8px 20px;
  }
  .hasPatient .patient-record-details > div {
    display: flex;
    flex-direction: column;
    min-width: 0;
    gap: 4px;
  }
  .hasPatient .patient-record-details strong {
    color: #40566a;
    font-size: 12px;
  }
  .hasPatient .patient-record-details span {
    overflow-wrap: anywhere;
    color: #526779;
  }
  .hasPatient .patient-actions-column .cell {
    padding: 8px;
  }
  .hasPatient .patient-row-actions {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 6px;
  }
  .hasPatient .patient-row-actions .el-button {
    margin: 0;
  }
  @media (max-width: 700px) {
    .hasPatient .patient-record-details {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
</style>