/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  LayoutGrid, 
  Target, 
  Users, 
  Briefcase, 
  FileText, 
  Headphones, 
  ChevronDown, 
  Search, 
  Bell, 
  HelpCircle, 
  Settings, 
  Plus,
  Filter,
  Calendar,
  MoreHorizontal,
  User,
  Phone,
  MessageSquare,
  Clock,
  ArrowLeft,
  CheckCircle2,
  Trash2,
  UserPlus,
  FileSpreadsheet,
  Download,
  RefreshCw,
  ExternalLink,
  Star,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Activity,
  ArrowUpRight,
  ChevronRight,
  Building2,
  Edit3,
  Check,
  Trophy,
  Handshake,
  Share2,
  Box,
  Save,
  Package,
  FileCheck,
  CreditCard,
  Receipt,
  Image as ImageIcon
} from 'lucide-react';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from 'recharts';

interface MenuItem {
  id: string;
  label: string;
  icon: any;
  subItems?: { id: string; label: string }[];
}

const menuItems: MenuItem[] = [
  { id: 'dashboard', label: '仪表盘', icon: LayoutGrid },
  { 
    id: 'leads', 
    label: '线索管理', 
    icon: Target,
    subItems: [
      { id: 'lead-list', label: '线索' },
      { id: 'lead-pool', label: '线索池' }
    ]
  },
  { 
    id: 'customers', 
    label: '客户管理', 
    icon: Users,
    subItems: [
      { id: 'customer-list', label: '客户' },
      { id: 'public-pool', label: '公海池' }
    ]
  },
  { id: 'opportunities', label: '商机管理', icon: Briefcase },
  { 
    id: 'business', 
    label: '商务管理', 
    icon: FileText,
    subItems: [
      { id: 'orders', label: '订单' },
      { id: 'contracts', label: '合同' },
      { id: 'payments', label: '回款' },
      { id: 'invoices', label: '发票' }
    ]
  },
  { id: 'products', label: '产品管理', icon: Package }
];

export default function App() {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['leads']);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditLeadModalOpen, setIsEditLeadModalOpen] = useState(false);
  const [isUserSelectionModalOpen, setIsUserSelectionModalOpen] = useState(false);
  const [userSelectionType, setUserSelectionType] = useState<'owner' | 'collaborator'>('owner');
  const [isAddCustomerModalOpen, setIsAddCustomerModalOpen] = useState(false);
  const [isAddOpportunityModalOpen, setIsAddOpportunityModalOpen] = useState(false);
  const [isAddOrderModalOpen, setIsAddOrderModalOpen] = useState(false);
  const [isAddContractModalOpen, setIsAddContractModalOpen] = useState(false);
  const [isAddPaymentModalOpen, setIsAddPaymentModalOpen] = useState(false);
  const [isAddInvoiceModalOpen, setIsAddInvoiceModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isEditOrderModalOpen, setIsEditOrderModalOpen] = useState(false);
  const [isEditOpportunityModalOpen, setIsEditOpportunityModalOpen] = useState(false);
  const [isAdvanceStageModalOpen, setIsAdvanceStageModalOpen] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<any>(null);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [selectedContract, setSelectedContract] = useState<any>(null);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isImportExcelModalOpen, setIsImportExcelModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importType, setImportType] = useState<'lead' | 'customer'>('lead');
  const [isFollowUpModalOpen, setIsFollowUpModalOpen] = useState(false);
  const [isAdvanceStatusModalOpen, setIsAdvanceStatusModalOpen] = useState(false);
  const [advanceTargetType, setAdvanceTargetType] = useState<'order' | 'contract' | 'payment' | 'invoice' | null>(null);
  const [advanceTargetData, setAdvanceTargetData] = useState<any>(null);

  const openAdvanceModal = (type: 'order' | 'contract' | 'payment' | 'invoice', data: any) => {
    setAdvanceTargetType(type);
    setAdvanceTargetData(data);
    setIsAdvanceStatusModalOpen(true);
  };

  const toggleExpand = (id: string) => {
    setExpandedMenus(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex h-screen bg-[#F9FAFB] text-[#111827] font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col z-20">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#22c55e] rounded-lg flex items-center justify-center text-white font-bold text-xl">
            <LayoutGrid size={24} />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">Thingcom</h1>
            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">CRM管理</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-2 overflow-y-auto">
          {menuItems.map((item) => (
            <div key={item.id} className="mb-1">
              <button
                onClick={() => item.subItems ? toggleExpand(item.id) : setActiveMenu(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
                  activeMenu === item.id || (item.subItems && item.subItems.some(s => s.id === activeMenu))
                    ? 'text-gray-900' 
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={20} className={activeMenu === item.id || (item.subItems && item.subItems.some(s => s.id === activeMenu)) ? 'text-gray-900' : 'text-gray-400'} />
                  <span className="font-medium text-sm">{item.label}</span>
                </div>
                {item.subItems && (
                  <ChevronDown 
                    size={14} 
                    className={`transition-transform text-gray-400 ${expandedMenus.includes(item.id) ? 'rotate-180' : ''}`} 
                  />
                )}
              </button>
              
              {item.subItems && expandedMenus.includes(item.id) && (
                <div className="mt-1 space-y-1">
                  {item.subItems.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => setActiveMenu(sub.id)}
                      className={`w-full flex items-center px-4 py-2 text-sm rounded-lg transition-all relative ${
                        activeMenu === sub.id 
                          ? 'bg-[#F0FDF4] text-[#22c55e] font-medium' 
                          : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      {activeMenu === sub.id && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#22c55e] rounded-r-full" />
                      )}
                      <div className="flex items-center gap-3 ml-4">
                        {sub.id === 'lead-list' ? <Filter size={14} /> : <div className="w-3.5 h-3.5 rounded-full border-2 border-current flex items-center justify-center text-[8px]">o</div>}
                        <span>{sub.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm">
              <img src="https://picsum.photos/seed/user/100/100" alt="User" referrerPolicy="no-referrer" />
            </div>
            <div>
              <p className="text-sm font-bold">陈晓明</p>
              <p className="text-[10px] text-gray-400">高级销售总监</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-10">
          <div className="relative w-[600px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="搜索客户名称 / 手机号..." 
              className="w-full pl-12 pr-4 py-2.5 bg-[#F3F4F6] border-none rounded-lg text-sm focus:ring-2 focus:ring-[#22c55e] transition-all outline-none"
            />
          </div>
          <div className="flex items-center gap-6">
            <button className="relative text-gray-600 hover:text-gray-900 transition-colors">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-[#D94E4E] rounded-full border-2 border-white"></span>
            </button>
            <button className="text-gray-600 hover:text-gray-900 transition-colors">
              <HelpCircle size={20} />
            </button>
            <button className="text-gray-600 hover:text-gray-900 transition-colors">
              <Settings size={20} />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            {activeMenu === 'dashboard' ? (
              <DashboardView />
            ) : activeMenu === 'lead-list' ? (
              <LeadListView 
                onAdd={() => setIsAddModalOpen(true)} 
                onViewDetail={(lead) => {
                  setSelectedLead(lead);
                  setActiveMenu('lead-detail');
                }}
                onFollowUp={(lead) => {
                  setSelectedLead(lead);
                  setIsFollowUpModalOpen(true);
                }}
              />
            ) : activeMenu === 'lead-pool' ? (
              <LeadPoolView 
                onAdd={() => setIsAddModalOpen(true)} 
                onImport={() => {
                  setImportType('lead');
                  setIsImportExcelModalOpen(true);
                }} 
              />
            ) : activeMenu === 'customer-list' ? (
              <CustomerListView 
                onAdd={() => setIsAddCustomerModalOpen(true)} 
                onViewDetail={(customer) => {
                  setSelectedCustomer(customer);
                  setActiveMenu('customer-detail');
                }}
                onFollowUp={(customer) => {
                  setSelectedCustomer(customer);
                  setIsFollowUpModalOpen(true);
                }}
              />
            ) : activeMenu === 'public-pool' ? (
              <PublicPoolView 
                onAdd={() => setIsAddCustomerModalOpen(true)} 
                onImport={() => {
                  setImportType('customer');
                  setIsImportExcelModalOpen(true);
                }} 
              />
            ) : activeMenu === 'lead-detail' ? (
              <LeadDetailView 
                lead={selectedLead} 
                onBack={() => setActiveMenu('lead-list')} 
                onEdit={() => setIsEditLeadModalOpen(true)}
                onChangeOwner={() => {
                  setUserSelectionType('owner');
                  setIsUserSelectionModalOpen(true);
                }}
                onAddCollaborator={() => {
                  setUserSelectionType('collaborator');
                  setIsUserSelectionModalOpen(true);
                }}
              />
            ) : activeMenu === 'customer-detail' ? (
              <CustomerDetailView 
                customer={selectedCustomer} 
                onBack={() => setActiveMenu('customer-list')} 
                onGenerateOpportunity={() => setIsAddOpportunityModalOpen(true)}
              />
            ) : activeMenu === 'opportunities' ? (
              <OpportunitiesView 
                onAdd={() => setIsAddOpportunityModalOpen(true)} 
                onAdvance={(opp) => {
                  setSelectedOpportunity(opp);
                  setIsAdvanceStageModalOpen(true);
                }}
                onViewDetail={(opp) => {
                  setSelectedOpportunity(opp);
                  setActiveMenu('opportunity-detail');
                }}
              />
            ) : activeMenu === 'opportunity-detail' ? (
              <OpportunityDetailView 
                opportunity={selectedOpportunity} 
                onBack={() => setActiveMenu('opportunities')}
                onEdit={() => setIsEditOpportunityModalOpen(true)}
                onAdvance={() => setIsAdvanceStageModalOpen(true)}
              />
            ) : activeMenu === 'orders' ? (
              <OrdersView 
                onAdd={() => setIsAddOrderModalOpen(true)} 
                onViewDetail={(order) => {
                  setSelectedOrder(order);
                  setActiveMenu('order-detail');
                }}
                onAdvance={(order) => openAdvanceModal('order', order)}
              />
            ) : activeMenu === 'order-detail' ? (
              <OrderDetailView 
                order={selectedOrder} 
                onBack={() => setActiveMenu('orders')}
                onEdit={() => setIsEditOrderModalOpen(true)}
                onAdvance={() => openAdvanceModal('order', selectedOrder)}
              />
            ) : activeMenu === 'contracts' ? (
              <ContractsView 
                onAdd={() => setIsAddContractModalOpen(true)} 
                onViewDetail={(contract) => {
                  setSelectedContract(contract);
                  setActiveMenu('contract-detail');
                }}
                onAdvance={(contract) => openAdvanceModal('contract', contract)}
              />
            ) : activeMenu === 'contract-detail' ? (
              <ContractDetailView 
                contract={selectedContract} 
                onBack={() => setActiveMenu('contracts')}
                onAdvance={() => openAdvanceModal('contract', selectedContract)}
              />
            ) : activeMenu === 'payments' ? (
              <PaymentsView 
                onAdd={() => setIsAddPaymentModalOpen(true)} 
                onViewDetail={(payment) => {
                  setSelectedPayment(payment);
                  setActiveMenu('payment-detail');
                }}
                onAdvance={(payment) => openAdvanceModal('payment', payment)}
              />
            ) : activeMenu === 'payment-detail' ? (
              <PaymentDetailView 
                payment={selectedPayment} 
                onBack={() => setActiveMenu('payments')}
                onAdvance={() => openAdvanceModal('payment', selectedPayment)}
              />
            ) : activeMenu === 'invoices' ? (
              <InvoicesView 
                onAdd={() => setIsAddInvoiceModalOpen(true)} 
                onViewDetail={(invoice) => {
                  setSelectedInvoice(invoice);
                  setActiveMenu('invoice-detail');
                }}
                onAdvance={(invoice) => openAdvanceModal('invoice', invoice)}
              />
            ) : activeMenu === 'invoice-detail' ? (
              <InvoiceDetailView 
                invoice={selectedInvoice} 
                onBack={() => setActiveMenu('invoices')}
                onAdvance={() => openAdvanceModal('invoice', selectedInvoice)}
              />
            ) : activeMenu === 'products' ? (
              <ProductsView 
                onAdd={() => setIsAddProductModalOpen(true)}
                onViewDetail={(product) => {
                  setSelectedProduct(product);
                  setActiveMenu('product-detail');
                }}
              />
            ) : activeMenu === 'product-detail' ? (
              <ProductDetailView 
                product={selectedProduct}
                onBack={() => setActiveMenu('products')}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                页面开发中...
              </div>
            )}

            <footer className="mt-16 mb-8 flex items-center justify-center gap-4 text-[10px] text-gray-300 font-bold tracking-[0.2em] uppercase">
              <div className="flex gap-1">
                {[1,2,3,4,5,6].map(i => <div key={i} className="w-1 h-3 bg-gray-200 rounded-full"></div>)}
              </div>
              <span>CRM • Thingcom V2.4.0</span>
            </footer>
          </div>
        </main>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {isAddModalOpen && (
          <LeadFormModal onClose={() => setIsAddModalOpen(false)} />
        )}
        {isEditLeadModalOpen && (
          <LeadFormModal 
            lead={selectedLead} 
            onClose={() => setIsEditLeadModalOpen(false)} 
          />
        )}
        {isUserSelectionModalOpen && (
          <UserSelectionModal 
            type={userSelectionType}
            onClose={() => setIsUserSelectionModalOpen(false)} 
          />
        )}
        {isImportExcelModalOpen && (
          <ImportExcelModal 
            type={importType}
            onClose={() => setIsImportExcelModalOpen(false)} 
          />
        )}
        {isFollowUpModalOpen && (
          <FollowUpModal 
            data={selectedLead || selectedCustomer} 
            type={selectedLead ? 'lead' : 'customer'}
            onClose={() => {
              setIsFollowUpModalOpen(false);
              setSelectedLead(null);
              setSelectedCustomer(null);
            }} 
          />
        )}
        {isAddCustomerModalOpen && (
          <AddCustomerModal onClose={() => setIsAddCustomerModalOpen(false)} />
        )}
        {isAddOpportunityModalOpen && (
          <AddOpportunityModal 
            onClose={() => setIsAddOpportunityModalOpen(false)} 
            customerName={selectedCustomer?.name}
          />
        )}
        {isEditOpportunityModalOpen && (
          <EditOpportunityModal 
            opportunity={selectedOpportunity} 
            onClose={() => setIsEditOpportunityModalOpen(false)} 
          />
        )}
        {isAdvanceStatusModalOpen && (
          <AdvanceStatusModal 
            type={advanceTargetType!}
            data={advanceTargetData}
            onClose={() => setIsAdvanceStatusModalOpen(false)}
          />
        )}
        {isAdvanceStageModalOpen && (
          <AdvanceStageModal 
            opportunity={selectedOpportunity} 
            onClose={() => {
              setIsAdvanceStageModalOpen(false);
              setSelectedOpportunity(null);
            }} 
          />
        )}
        {isAddOrderModalOpen && (
          <AddOrderModal onClose={() => setIsAddOrderModalOpen(false)} />
        )}
        {isAddContractModalOpen && (
          <AddContractModal onClose={() => setIsAddContractModalOpen(false)} />
        )}
        {isAddPaymentModalOpen && (
          <AddPaymentModal onClose={() => setIsAddPaymentModalOpen(false)} />
        )}
        {isAddInvoiceModalOpen && (
          <AddInvoiceModal onClose={() => setIsAddInvoiceModalOpen(false)} />
        )}
        {isAddProductModalOpen && (
          <AddProductModal onClose={() => setIsAddProductModalOpen(false)} />
        )}
        {isEditOrderModalOpen && (
          <EditOrderModal order={selectedOrder} onClose={() => setIsEditOrderModalOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function OpportunitiesView({ onAdd, onAdvance, onViewDetail }: { onAdd: () => void, onAdvance: (opp: any) => void, onViewDetail: (opp: any) => void }) {
  const opportunities = [
    { name: '2024 云服务器集群采购', customer: '北京智云科技集团', amount: '1,250,000', stage: '初步接触', owner: '张建国', time: '2023-10-24 14:20' },
    { name: 'AI赋能中心建设', customer: '未来机器人有限公司', amount: '4,800,000', stage: '需求确认', owner: '李晓丽', time: '2023-10-23 09:15' },
    { name: '数字化工厂升级 2.0', customer: '大发精密模具', amount: '850,000', stage: '报价阶段', owner: '张建国', time: '2023-10-22 17:45' },
    { name: '年度维保服务合同', customer: '盛世投资控股', amount: '120,000', stage: '谈判阶段', owner: '张建国', time: '2023-10-21 11:30' },
    { name: '智慧物流分拣系统', customer: '速递快运集团', amount: '2,300,000', stage: '已赢单', owner: '王思聪', time: '2023-10-18 16:05' },
    { name: '数据安全防御组件', customer: '诚信金融服务', amount: '45,000', stage: '已输单', owner: '张建国', time: '2023-10-15 14:40' },
  ];

  const getStageColor = (stage: string) => {
    switch (stage) {
      case '初步接触': return 'bg-blue-50 text-blue-500';
      case '需求确认': return 'bg-indigo-50 text-indigo-500';
      case '报价阶段': return 'bg-orange-50 text-orange-500';
      case '谈判阶段': return 'bg-purple-50 text-purple-500';
      case '已赢单': return 'bg-green-50 text-green-500';
      case '已输单': return 'bg-red-50 text-red-500';
      default: return 'bg-gray-50 text-gray-500';
    }
  };

  return (
    <>
      <nav className="flex items-center gap-2 text-[11px] text-gray-400 mb-2 font-medium">
        <span>CRM</span>
        <span className="text-gray-300">/</span>
        <span className="text-[#007A41]">商机管理</span>
      </nav>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">商机列表</h2>
          <p className="text-sm text-gray-400 mt-1">管理并推进您的业务机会，查看实时转化进度。</p>
        </div>
        <button 
          onClick={onAdd}
          className="bg-[#007A41] text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-[#006335] transition-all shadow-lg shadow-[#007A41]/20 font-bold text-sm"
        >
          <Plus size={20} />
          <span>新增商机</span>
        </button>
      </div>

      {/* Filter Section */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-8">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[300px] relative">
            <input 
              type="text" 
              placeholder="搜索商机名称 / 客户名称" 
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#007A41] text-sm" 
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
          </div>
          <div className="w-48 relative">
            <select className="w-full appearance-none px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#007A41] text-sm text-gray-600 font-medium">
              <option>所有阶段</option>
              <option>初步接触</option>
              <option>需求确认</option>
              <option>报价阶段</option>
              <option>谈判阶段</option>
              <option>已赢单</option>
              <option>已输单</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
          <div className="w-48 relative">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl">
              <User size={16} className="text-gray-400" />
              <select className="flex-1 appearance-none bg-transparent outline-none text-sm text-gray-600 font-medium">
                <option>负责人：张建国</option>
                <option>负责人：李晓丽</option>
                <option>负责人：王思聪</option>
              </select>
              <ChevronDown className="text-gray-400 pointer-events-none" size={14} />
            </div>
          </div>
          <button className="px-8 py-2.5 bg-white border border-gray-100 text-[#007A41] rounded-xl font-bold text-sm hover:bg-gray-50 transition-all">
            查询
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F9FAFB] border-b border-gray-100">
              <th className="pl-8 pr-4 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">商机名称</th>
              <th className="px-4 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">客户名称</th>
              <th className="px-4 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">预估金额</th>
              <th className="px-4 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">阶段</th>
              <th className="px-4 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">负责人</th>
              <th className="px-4 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">更新时间</th>
              <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {opportunities.map((opp, i) => (
              <tr 
                key={i} 
                className="hover:bg-gray-50 transition-colors group cursor-pointer"
                onClick={() => onViewDetail(opp)}
              >
                <td className="pl-8 pr-4 py-6">
                  <div className="font-bold text-[#007A41] text-sm hover:underline">{opp.name}</div>
                </td>
                <td className="px-4 py-6 text-sm text-gray-600 font-medium">{opp.customer}</td>
                <td className="px-4 py-6">
                  <div className="flex items-center gap-1 font-bold text-gray-900">
                    <span className="text-xs text-gray-400">¥</span>
                    <span>{opp.amount}</span>
                  </div>
                </td>
                <td className="px-4 py-6">
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${getStageColor(opp.stage)}`}>
                    {opp.stage}
                  </span>
                </td>
                <td className="px-4 py-6">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#007A41] text-white text-[10px] font-bold flex items-center justify-center">
                      {opp.owner.charAt(0)}
                    </div>
                    <span className="text-sm text-gray-600 font-medium">{opp.owner}</span>
                  </div>
                </td>
                <td className="px-4 py-6 text-sm text-gray-400 font-medium leading-relaxed">
                  {opp.time.split(' ')[0]}<br/>
                  <span className="text-[10px] opacity-70">{opp.time.split(' ')[1]}</span>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewDetail(opp);
                      }}
                      className="text-[#007A41] hover:underline text-xs font-bold transition-colors"
                    >
                      详情
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onAdvance(opp);
                      }}
                      className="text-[#007A41] hover:underline text-xs font-bold transition-colors"
                    >
                      推进
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-8 py-6 border-t border-gray-50 flex items-center justify-between bg-gray-50/30">
          <div className="text-[11px] text-gray-400 font-bold tracking-widest uppercase">
            显示 1-6 条，共 1,248 条
          </div>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100 text-gray-400 hover:bg-white transition-all">
              <ChevronDown className="rotate-90" size={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#007A41] text-white text-xs font-bold shadow-lg shadow-[#007A41]/20">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100 text-gray-600 text-xs font-bold hover:bg-white transition-all">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100 text-gray-600 text-xs font-bold hover:bg-white transition-all">3</button>
            <span className="text-gray-300 mx-1">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100 text-gray-600 text-xs font-bold hover:bg-white transition-all">208</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100 text-gray-400 hover:bg-white transition-all">
              <ChevronDown className="-rotate-90" size={14} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function OpportunityDetailView({ opportunity, onBack, onEdit, onAdvance }: { opportunity: any, onBack: () => void, onEdit: () => void, onAdvance: () => void }) {
  if (!opportunity) return null;

  const [showAddComment, setShowAddComment] = useState(false);

  const stages = [
    { name: '初步接触', status: 'completed' },
    { name: '需求确认', status: 'completed' },
    { name: '报价 (当前)', status: 'active' },
    { name: '谈判', status: 'pending' },
    { name: '赢单/输单', status: 'pending' },
  ];

  const currentStage = stages.find(s => s.status === 'active')?.name || '未知阶段';

  return (
    <div className="flex flex-col h-full bg-[#F9FAFB]">
      {/* Header */}
      <div className="px-8 py-6 bg-white border-b border-gray-100">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
          <button onClick={onBack} className="hover:text-[#007A41]">CRM</button>
          <ChevronRight size={12} />
          <button onClick={onBack} className="hover:text-[#007A41]">商机管理</button>
          <ChevronRight size={12} />
          <span className="text-gray-900 font-medium">商机详情</span>
        </div>

        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">{opportunity.name}</h1>
              <span className="px-2 py-0.5 bg-green-50 text-[#007A41] text-[10px] font-bold rounded uppercase tracking-wider">报价</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Building2 size={14} />
              <span>{opportunity.customer}</span>
            </div>
            <div className="flex items-baseline gap-2 mt-4">
              <span className="text-xl font-bold text-gray-400">¥</span>
              <span className="text-4xl font-black text-gray-900 tracking-tight">{opportunity.amount}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={onEdit}
              className="px-6 py-2 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all flex items-center gap-2"
            >
              <Edit3 size={16} />
              编辑
            </button>
            <button 
              onClick={onAdvance}
              className="px-6 py-2 bg-[#007A41] text-white rounded-xl text-sm font-bold hover:bg-[#006837] transition-all flex items-center gap-2 shadow-lg shadow-[#007A41]/20"
            >
              推进阶段
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 space-y-6">
        {/* Progress Bar */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between relative">
            {/* Line */}
            <div className="absolute top-6 left-0 right-0 h-1 bg-gray-100 -z-0" />
            <div className="absolute top-6 left-0 w-1/2 h-1 bg-[#007A41] -z-0" />
            
            {stages.map((stage, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 border-white shadow-sm ${
                  stage.status === 'completed' ? 'bg-[#007A41] text-white' :
                  stage.status === 'active' ? 'bg-[#10B981] text-white' :
                  'bg-white text-gray-300 border-gray-100'
                }`}>
                  {stage.status === 'completed' ? <Check size={20} strokeWidth={3} /> : 
                   stage.status === 'active' ? <Target size={20} /> :
                   idx === stages.length - 1 ? <Trophy size={20} /> : <Handshake size={20} />}
                </div>
                <span className={`text-xs font-bold ${stage.status === 'pending' ? 'text-gray-400' : 'text-gray-900'}`}>
                  {stage.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            {/* Basic Info Card */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold text-gray-900">基础信息</h3>
                <button className="text-[#007A41] text-xs font-bold flex items-center gap-1 hover:underline">
                  <Edit3 size={14} />
                  编辑字段
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-y-8 gap-x-12">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">商机所有者</p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#007A41]/10 flex items-center justify-center text-xs font-bold text-[#007A41]">张</div>
                    <span className="text-sm font-bold text-gray-900">{opportunity.owner}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">商机来源</p>
                  <p className="text-sm font-bold text-gray-900">官网咨询</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">创建时间</p>
                  <p className="text-sm font-bold text-gray-900">2023-10-15 10:00</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">最后更新</p>
                  <div className="flex items-center gap-2 text-[#007A41]">
                    <Clock size={14} />
                    <p className="text-sm font-bold">{opportunity.time}</p>
                  </div>
                </div>
                <div className="col-span-2 space-y-2">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">核心需求简述</p>
                  <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    客户需要构建一套支持高并发在线业务的私有云集群，初期规模为50个计算节点，需配套分布式存储与万兆内网环境。对系统稳定性和后期维保响应时间有极高要求。
                  </p>
                </div>
              </div>
            </div>

            {/* Attachments */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4 hover:border-[#007A41] transition-all cursor-pointer group">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileText size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">项目需求书_V2.pdf</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">2.4 MB • 2天前上传</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4 hover:border-[#007A41] transition-all cursor-pointer group">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ImageIcon size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">客户架构拓扑图.svg</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">1.1 MB • 3天前上传</p>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-gray-900">推进历程</h3>
              <button 
                onClick={() => setShowAddComment(true)}
                className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#007A41] hover:text-white transition-all"
              >
                <Plus size={16} />
              </button>
            </div>

            <div className="flex-1 space-y-8 relative">
              <div className="absolute top-0 bottom-0 left-4 w-0.5 bg-gray-50 -z-0" />
              
              {[
                { stage: '报价阶段', time: '2023-10-24 14:20', content: '已向客户发送报价单，等待反馈。', active: true },
                { stage: '需求确认阶段', time: '2023-10-20 11:30', content: '客户确认了基本的服务器配置需求。' },
                { stage: '初步接触阶段', time: '2023-10-15 10:00', content: '首次电话沟通，客户表现出强烈意向。' },
              ].map((item, idx) => (
                <div key={idx} className="relative z-10 flex gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-4 border-white shadow-sm ${
                    item.active ? 'bg-[#10B981] text-white' : 'bg-gray-200 text-gray-400'
                  }`}>
                    {item.active ? <Target size={14} /> : <Check size={14} />}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 bg-gray-50 text-gray-400 text-[10px] font-bold rounded uppercase tracking-wider">{item.stage}</span>
                      <span className="text-[10px] text-gray-400 font-bold">{item.time}</span>
                    </div>
                    <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-50">
                      <p className="text-sm text-gray-900 font-medium leading-relaxed">{item.content}</p>
                      <div className="flex items-center gap-2 mt-3">
                        <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-[8px] font-bold text-gray-500">张</div>
                        <span className="text-[10px] text-gray-400 font-bold">张建国 (负责人)</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-8 w-full py-3 bg-gray-50 rounded-xl text-xs font-bold text-gray-400 hover:text-[#007A41] transition-all flex items-center justify-center gap-2">
              <Clock size={14} />
              查看完整历程
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {showAddComment && (
          <AddStageCommentModal 
            stage={currentStage} 
            onClose={() => setShowAddComment(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function AddStageCommentModal({ stage, onClose }: { stage: string, onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
      >
        <div className="px-8 py-6 flex items-center justify-between border-b border-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E6F9F0] text-[#007A41] flex items-center justify-center">
              <MessageSquare size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">添加推进说明</h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">当前阶段: {stage}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-900 transition-colors">
            <Plus className="rotate-45" size={24} />
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">说明内容</label>
            <textarea 
              autoFocus
              placeholder="请输入推进说明内容..." 
              className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#007A41] text-sm h-40 resize-none font-medium leading-relaxed"
            />
          </div>

          <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-2xl border border-blue-100">
            <HelpCircle size={16} className="text-blue-500 shrink-0" />
            <p className="text-[10px] text-blue-600 font-bold leading-relaxed">
              说明：此操作仅对当前阶段进行补充说明，不会改变商机所处的阶段。
            </p>
          </div>
        </div>

        <div className="px-8 py-6 bg-gray-50 flex items-center justify-end gap-4">
          <button onClick={onClose} className="px-6 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">取消</button>
          <button onClick={onClose} className="bg-[#007A41] text-white px-10 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-[#007A41]/20 hover:bg-[#006335] transition-all">
            保存说明
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function EditOpportunityModal({ opportunity, onClose }: { opportunity: any, onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
      >
        <div className="px-8 py-6 flex items-center justify-between border-b border-gray-50">
          <h3 className="text-xl font-bold text-gray-900">编辑商机</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-900 transition-colors font-bold text-sm">取消</button>
        </div>

        <div className="p-8 space-y-6 overflow-y-auto max-h-[70vh]">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500">商机名称</label>
            <input 
              type="text" 
              defaultValue={opportunity?.name}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#007A41] text-sm font-bold" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500">客户名称</label>
            <div className="relative">
              <input 
                type="text" 
                defaultValue={opportunity?.customer}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#007A41] text-sm font-bold" 
              />
              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">金额</label>
              <div className="relative">
                <input 
                  type="text" 
                  defaultValue={opportunity?.amount}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#007A41] text-sm font-bold" 
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">¥</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">负责人</label>
              <div className="relative">
                <select className="w-full appearance-none pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#007A41] text-sm font-bold">
                  <option>{opportunity?.owner}</option>
                  <option>李晓丽</option>
                  <option>王大伟</option>
                </select>
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500">商机来源</label>
            <div className="relative">
              <select className="w-full appearance-none pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#007A41] text-sm font-bold">
                <option>官网咨询</option>
                <option>线下展会</option>
                <option>客户推荐</option>
              </select>
              <Share2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500">相关产品</label>
            <div className="relative">
              <select className="w-full appearance-none pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#007A41] text-sm font-bold">
                <option>请选择产品</option>
                <option>云服务器集群</option>
                <option>AI赋能中心解决方案</option>
              </select>
              <Box className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
          </div>
        </div>

        <div className="p-8 bg-gray-50 flex items-center justify-end gap-4">
          <button onClick={onClose} className="px-6 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">取消</button>
          <button onClick={onClose} className="bg-[#00A862] text-white px-8 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-[#00A862]/20 hover:bg-[#008F53] transition-all flex items-center gap-2">
            <Save size={18} />
            保存修改
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function AdvanceStatusModal({ type, data, onClose }: { type: 'order' | 'contract' | 'payment' | 'invoice', data: any, onClose: () => void }) {
  const getStatusOptions = () => {
    switch (type) {
      case 'order':
        return ['新建', '已确认', '已取消'];
      case 'contract':
        return ['草稿', '已签署', '已终止'];
      case 'payment':
        return ['待回款', '部分回款', '已回款'];
      case 'invoice':
        return ['待开票', '已开票', '已作废'];
      default:
        return [];
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'order': return '推进订单状态';
      case 'contract': return '推进合同状态';
      case 'payment': return '推进回款状态';
      case 'invoice': return '推进发票状态';
    }
  };

  const options = getStatusOptions();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
      >
        <div className="px-8 py-6 flex items-center justify-between border-b border-gray-50">
          <h3 className="text-xl font-bold text-gray-900">{getTitle()}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-900 transition-colors">
            <Plus className="rotate-45" size={24} />
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-500">当前状态</label>
            <div className="px-4 py-3 bg-gray-50 rounded-xl text-sm font-bold text-gray-900 flex items-center gap-2">
              <div className="w-2 h-2 bg-[#22c55e] rounded-full"></div>
              {data?.status || '未知'}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-500">变更至</label>
            <div className="grid grid-cols-1 gap-3">
              {options.map((option) => (
                <button
                  key={option}
                  className={`px-4 py-4 rounded-2xl text-sm font-bold border-2 transition-all flex items-center justify-between group ${
                    data?.status === option 
                      ? 'border-[#22c55e] bg-[#22c55e]/5 text-[#22c55e]' 
                      : 'border-gray-100 hover:border-gray-200 text-gray-600'
                  }`}
                >
                  {option}
                  {data?.status === option && <Check size={18} />}
                  {data?.status !== option && <div className="w-5 h-5 rounded-full border-2 border-gray-100 group-hover:border-gray-200"></div>}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-500">推进备注</label>
            <textarea 
              placeholder="请输入推进备注信息..." 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#22c55e] text-sm h-24 resize-none"
            />
          </div>
        </div>

        <div className="p-8 bg-gray-50 flex items-center justify-end gap-4">
          <button onClick={onClose} className="px-8 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">取消</button>
          <button onClick={onClose} className="bg-[#22c55e] text-white px-10 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-[#22c55e]/20 hover:bg-[#16a34a] transition-all">确认变更</button>
        </div>
      </motion.div>
    </div>
  );
}

function AdvanceStageModal({ opportunity, onClose }: { opportunity: any, onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg bg-[#F3F4F6] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      >
        <div className="px-8 py-6 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">推进阶段</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-900 transition-colors">
            <Plus className="rotate-45" size={24} />
          </button>
        </div>

        <div className="px-8 pb-8 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-500">下一阶段</label>
            <div className="bg-white border border-gray-100 rounded-xl px-4 py-3 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2 text-gray-900 font-bold">
                <Target size={16} className="text-[#007A41]" />
                <span>谈判</span>
              </div>
              <span className="text-[10px] font-bold text-[#007A41] bg-[#E6F9F0] px-2 py-0.5 rounded uppercase tracking-wider">Current Next</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500">推进时间</label>
              <div className="relative">
                <input 
                  type="text" 
                  defaultValue="2024-10-24 15:30" 
                  className="w-full px-4 py-2.5 bg-white border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#007A41] text-sm font-medium" 
                />
                <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500">操作人</label>
              <div className="relative">
                <input 
                  type="text" 
                  defaultValue="张建国" 
                  readOnly
                  className="w-full px-4 py-2.5 bg-white border border-gray-100 rounded-xl outline-none text-sm font-medium" 
                />
                <User className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-500">推进备注</label>
            <textarea 
              placeholder="请输入推进备注 (可选)" 
              className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#007A41] text-sm h-32 resize-none shadow-sm"
            />
          </div>

          <div className="flex items-center justify-end gap-4 pt-4">
            <button onClick={onClose} className="px-6 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">取消</button>
            <button onClick={onClose} className="bg-[#00A862] text-white px-8 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-[#00A862]/20 hover:bg-[#008F53] transition-all">确认推进</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function AddOpportunityModal({ onClose, customerName }: { onClose: () => void, customerName?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">新建商机</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-900 transition-colors">
            <Plus className="rotate-45" size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-10">
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-5 bg-[#007A41] rounded-full" />
              <h4 className="font-bold text-gray-900">基本信息</h4>
            </div>

            <div className="grid grid-cols-2 gap-x-12 gap-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">商机名称 <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input type="text" placeholder="输入商机名称" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#007A41] text-sm" />
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">客户名称 <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="选择客户" 
                    defaultValue={customerName}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#007A41] text-sm" 
                  />
                  <Users className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">企业Logo</label>
                <div className="border-2 border-dashed border-gray-100 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer h-[160px]">
                  <div className="w-10 h-10 rounded-xl bg-[#E6F9F0] text-[#007A41] flex items-center justify-center">
                    <Plus size={20} />
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-bold text-gray-500">点击上传或拖拽图片</p>
                    <p className="text-[8px] text-gray-300 mt-1 uppercase tracking-widest">JPG, PNG (Max 2MB)</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">负责人 <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <input type="text" value="admin" readOnly className="w-full px-4 py-2.5 bg-gray-100 border border-gray-100 rounded-xl outline-none text-sm text-gray-600" />
                    <User className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">商机阶段 <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select className="w-full appearance-none px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#007A41] text-sm text-gray-500">
                      <option>请选择阶段</option>
                      <option>初步接触</option>
                      <option>需求确认</option>
                      <option>方案/报价</option>
                      <option>谈判/合同</option>
                      <option>赢单</option>
                      <option>输单</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">关联产品 <span className="text-red-500">*</span></label>
                <div className="relative">
                  <select className="w-full appearance-none px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#007A41] text-sm text-gray-500">
                    <option>请选择产品</option>
                    <option>云服务器集群</option>
                    <option>AI赋能中心解决方案</option>
                    <option>数字化工厂升级包</option>
                    <option>数据安全防御组件</option>
                    <option>年度维保服务</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">产品数量</label>
                <div className="relative">
                  <input 
                    type="number" 
                    min="1"
                    defaultValue="1"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#007A41] text-sm" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">预估金额 (元)</label>
                <div className="relative">
                  <input type="number" placeholder="0.00" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#007A41] text-sm" />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold">¥</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">预计成交日期</label>
                <div className="relative">
                  <input type="date" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#007A41] text-sm" />
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-5 bg-[#007A41] rounded-full" />
              <h4 className="font-bold text-gray-900">详细信息</h4>
            </div>
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">核心需求简述</label>
                <textarea placeholder="请输入核心需求简述..." className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#007A41] text-sm h-32 resize-none" />
              </div>
            </div>
          </section>
        </div>

        <div className="px-8 py-6 border-t border-gray-100 flex items-center justify-end gap-4 bg-gray-50/30">
          <button onClick={onClose} className="px-8 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">取消</button>
          <button onClick={onClose} className="bg-[#007A41] text-white px-10 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-[#007A41]/20 hover:bg-[#006335] transition-all">保存</button>
        </div>
      </motion.div>
    </div>
  );
}

function DashboardView() {
  const kpiData = [
    { label: '本月销售额', value: '¥1,284,500', change: '+12.5%', isUp: true, icon: TrendingUp, color: 'text-[#22c55e]', bg: 'bg-[#F0FDF4]' },
    { label: '新增线索', value: '156', change: '+8.2%', isUp: true, icon: Target, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: '线索转化率', value: '24.5%', change: '-2.1%', isUp: false, icon: Activity, color: 'text-orange-500', bg: 'bg-orange-50' },
    { label: '进行中商机', value: '42', change: '+15.0%', isUp: true, icon: Briefcase, color: 'text-purple-500', bg: 'bg-purple-50' },
  ];

  const salesData = [
    { name: '1月', value: 400000 },
    { name: '2月', value: 300000 },
    { name: '3月', value: 600000 },
    { name: '4月', value: 800000 },
    { name: '5月', value: 500000 },
    { name: '6月', value: 900000 },
    { name: '7月', value: 1284500 },
  ];

  const sourceData = [
    { name: '官网咨询', value: 400 },
    { name: '广告投放', value: 300 },
    { name: '转介绍', value: 200 },
    { name: '冷拨电话', value: 100 },
  ];

  const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#8b5cf6'];

  const activities = [
    { id: 1, user: '陈晓明', action: '签署了合同', target: '智能工业网关采购合同', time: '10分钟前' },
    { id: 2, user: '王大伟', action: '新增了线索', target: '某大型制造企业', time: '25分钟前' },
    { id: 3, user: '系统', action: '自动分配了线索', target: '李小龙', time: '1小时前' },
    { id: 4, user: '张三', action: '更新了商机阶段', target: '云端数据分析平台', time: '2小时前' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${kpi.bg} ${kpi.color} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110`}>
                <kpi.icon size={24} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${kpi.isUp ? 'text-[#22c55e]' : 'text-red-500'}`}>
                {kpi.isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {kpi.change}
              </div>
            </div>
            <p className="text-sm font-medium text-gray-500 mb-1">{kpi.label}</p>
            <h3 className="text-2xl font-bold text-gray-900">{kpi.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sales Trend */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900">销售业绩趋势</h3>
              <p className="text-sm text-gray-400">展示过去7个月的销售额变化</p>
            </div>
            <select className="bg-gray-50 border-none rounded-xl px-4 py-2 text-sm font-medium focus:ring-2 focus:ring-[#22c55e]/20 outline-none">
              <option>最近7个月</option>
              <option>最近12个月</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                  tickFormatter={(value) => `¥${value/10000}w`}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => [`¥${value.toLocaleString()}`, '销售额']}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#22c55e" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lead Sources */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-8">线索来源分布</h3>
          <div className="h-[250px] w-full mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3">
            {sourceData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                  <span className="text-sm text-gray-500">{item.name}</span>
                </div>
                <span className="text-sm font-bold text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-gray-900">最近动态</h3>
            <button className="text-sm font-bold text-[#22c55e] hover:underline">查看全部</button>
          </div>
          <div className="space-y-6">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <img src={`https://picsum.photos/seed/${activity.user}/40/40`} className="rounded-full" alt="" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    <span className="font-bold">{activity.user}</span>
                    <span className="mx-1 text-gray-500">{activity.action}</span>
                    <span className="font-bold text-[#22c55e]">{activity.target}</span>
                  </p>
                  <div className="flex items-center gap-1 mt-1 text-[10px] text-gray-400 font-medium">
                    <Clock size={10} />
                    {activity.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reminders */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-gray-900">待办提醒</h3>
            <button className="p-2 bg-gray-50 text-gray-400 hover:text-[#22c55e] rounded-xl transition-all">
              <Plus size={18} />
            </button>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-[#F0FDF4] border border-[#DCFCE7] rounded-2xl flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#22c55e] shadow-sm">
                <Calendar size={20} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-900">客户回访：某大型制造企业</p>
                <p className="text-xs text-[#22c55e] font-medium">今天 14:30</p>
              </div>
              <button className="px-4 py-1.5 bg-white text-[#22c55e] rounded-lg text-xs font-bold shadow-sm hover:bg-gray-50 transition-all">
                去处理
              </button>
            </div>
            <div className="p-4 bg-orange-50 border border-orange-100 rounded-2xl flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-orange-500 shadow-sm">
                <FileText size={20} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-900">合同待签署：智能工业网关</p>
                <p className="text-xs text-orange-500 font-medium">明天 10:00 截止</p>
              </div>
              <button className="px-4 py-1.5 bg-white text-orange-500 rounded-lg text-xs font-bold shadow-sm hover:bg-gray-50 transition-all">
                去处理
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LeadListView({ onAdd, onViewDetail, onFollowUp }: { onAdd: () => void, onViewDetail: (lead: any) => void, onFollowUp: (lead: any) => void }) {
  const leads = [
    { name: 'Precision Biotics Ltd', industry: '医药与生命科学', contact: 'Sarah Jenkins', phone: '+86 138-0013-8000', source: '官', owner: '陈晓明', status: '跟进中', time: '2023-10-24 14:30' },
    { name: 'Green Horizons Architecture', industry: '可持续设计', contact: 'Michael Zhao', phone: '+86 185-1122-3344', source: '推', owner: '陈晓明', status: '已转客户', time: '2023-10-22 09:15' },
    { name: 'Urban Oasis Retail', industry: '房地产', contact: 'Elena Rossi', phone: '+86 139-4455-6677', source: '展', owner: '陈晓明', status: '未跟进', time: '从未' },
    { name: 'Stellar Dynamics Co.', industry: '物流', contact: 'David Vance', phone: '+86 177-8899-0011', source: '广', owner: '陈晓明', status: '无效', time: '2023-10-15 11:20' },
  ];

  return (
    <>
      <nav className="flex items-center gap-2 text-[11px] text-gray-400 mb-2 font-medium">
        <span>CRM</span>
        <span className="text-gray-300">/</span>
        <span className="text-[#007A41]">线索管理</span>
        <span className="text-gray-300">/</span>
        <span className="text-[#007A41]">线索</span>
      </nav>

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">线索管理列表</h2>
        <button 
          onClick={onAdd}
          className="bg-[#007A41] text-white px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-[#006335] transition-all shadow-sm font-semibold text-sm"
        >
          <Plus size={18} />
          <span>新增线索</span>
        </button>
      </div>

      {/* Filter Section */}
      <div className="bg-[#F8F9FA] p-8 rounded-2xl border border-gray-100 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 block">状态</label>
            <div className="flex flex-wrap gap-2">
              {['全部', '未跟进', '跟进中', '已转客户'].map((status) => (
                <button 
                  key={status}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    status === '全部' 
                      ? 'bg-[#007A41] text-white shadow-lg shadow-[#007A41]/20' 
                      : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-100'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 block">来源</label>
            <div className="relative">
              <select className="w-full appearance-none bg-white border border-gray-100 rounded-xl px-5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#007A41] text-gray-600 font-medium">
                <option>全部来源</option>
                <option>官网</option>
                <option>推荐</option>
                <option>展会</option>
                <option>广告</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
          </div>
          <div>
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 block">行业</label>
            <div className="relative">
              <select className="w-full appearance-none bg-white border border-gray-100 rounded-xl px-5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#007A41] text-gray-600 font-medium">
                <option>全部行业</option>
                <option>IT/软件</option>
                <option>制造业</option>
                <option>金融业</option>
                <option>教育培训</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
          </div>
          <div>
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 block">创建日期</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="选择日期范围" 
                className="w-full pl-12 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#007A41] text-gray-600 font-medium"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F9FAFB] border-b border-gray-100">
              <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">客户名称</th>
              <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">联系人</th>
              <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">手机号</th>
              <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">来源</th>
              <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">负责人</th>
              <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">状态</th>
              <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">最近跟进时间</th>
              <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {leads.map((lead, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors group">
                <td className="px-8 py-6">
                  <div className="font-bold text-gray-900 text-sm mb-0.5">{lead.name}</div>
                  <div className="text-[11px] text-gray-400 font-medium">{lead.industry}</div>
                </td>
                <td className="px-8 py-6 text-sm text-gray-600 font-medium">{lead.contact}</td>
                <td className="px-8 py-6 text-sm text-gray-600 tabular-nums font-medium">{lead.phone}</td>
                <td className="px-8 py-6">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded bg-[#F3F4F6] text-gray-400 text-[10px] font-bold border border-gray-100">
                    {lead.source}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#007A41] flex items-center justify-center text-white text-[9px] font-bold shadow-sm">AC</div>
                    <span className="text-sm text-gray-600 font-medium">{lead.owner}</span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  {lead.status === '无效' ? (
                    <div className="flex items-center gap-2 text-xs font-bold text-[#D94E4E]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D94E4E]"></span>
                      {lead.status}
                    </div>
                  ) : (
                    <span className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold ${
                      lead.status === '跟进中' ? 'bg-[#EBF2FF] text-[#4E8DFF]' :
                      lead.status === '已转客户' ? 'bg-[#E6F9F0] text-[#00C068]' :
                      'bg-[#F3F4F6] text-gray-400'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        lead.status === '跟进中' ? 'bg-[#4E8DFF]' :
                        lead.status === '已转客户' ? 'bg-[#00C068]' :
                        'bg-gray-300'
                      }`}></span>
                      {lead.status}
                    </span>
                  )}
                </td>
                <td className="px-8 py-6 text-sm text-gray-400 font-medium">{lead.time}</td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <button 
                      onClick={() => onViewDetail(lead)}
                      className="text-[#007A41] text-xs font-bold hover:underline"
                    >
                      详情
                    </button>
                    <button 
                      onClick={() => onFollowUp(lead)}
                      className="text-[#007A41] text-xs font-bold hover:underline"
                    >
                      跟进
                    </button>
                    <button className="text-gray-300 hover:text-gray-900 transition-colors">
                      <MoreHorizontal size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Pagination */}
        <div className="px-8 py-5 bg-[#F9FAFB] border-t border-gray-100 flex items-center justify-between">
          <div className="text-[11px] text-gray-400 font-medium">
            显示第 <span className="text-gray-900">1</span> 到 <span className="text-gray-900">4</span> 条，共 156 条线索
          </div>
          <div className="flex items-center gap-2.5">
            <button className="p-1.5 text-gray-300 hover:text-gray-900 disabled:opacity-30 transition-colors" disabled>&lt;</button>
            {[1, 2, 3, '...', 39].map((page, i) => (
              <button 
                key={i}
                className={`w-8 h-8 rounded-lg text-[11px] font-bold transition-all ${
                  page === 1 ? 'bg-[#007A41] text-white shadow-lg shadow-[#007A41]/20' : 'text-gray-400 hover:bg-gray-200'
                }`}
              >
                {page}
              </button>
            ))}
            <button className="p-1.5 text-gray-300 hover:text-gray-900 transition-colors">&gt;</button>
          </div>
        </div>
      </div>
    </>
  );
}

function LeadPoolView({ onAdd, onImport }: { onAdd: () => void, onImport: () => void }) {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const leads = [
    { name: '绿野科技有限公司', contact: '张静秋', phone: '138****5521', source: '官网咨询', status: '待分配', time: '2023-10-24 14:30' },
    { name: '深蓝建工集团', contact: '李博文', phone: '159****8823', source: '线下展会', status: '待分配', time: '2023-10-24 11:15' },
    { name: '恒达贸易有限公司', contact: '王思萌', phone: '131****0091', source: '线上推广', status: '待分配', time: '2023-10-23 17:45' },
    { name: '极光数字科技', contact: '赵云凡', phone: '137****4432', source: '转介绍', status: '待分配', time: '2023-10-23 09:20' },
    { name: '天宇教育咨询', contact: '孙立群', phone: '188****6721', source: '官网咨询', status: '待分配', time: '2023-10-22 15:55' },
  ];

  const toggleSelectAll = () => {
    if (selectedRows.length === leads.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(leads.map((_, i) => i));
    }
  };

  const toggleSelectRow = (index: number) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter(i => i !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };

  return (
    <>
      <nav className="flex items-center gap-2 text-[11px] text-gray-400 mb-2 font-medium">
        <span>CRM</span>
        <span className="text-gray-300">/</span>
        <span className="text-[#007A41]">线索管理</span>
        <span className="text-gray-300">/</span>
        <span className="text-[#007A41]">线索池</span>
      </nav>

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">线索池</h2>
        <div className="flex items-center gap-3">
          <button 
            onClick={onAdd}
            className="bg-[#007A41] text-white px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-[#006335] transition-all shadow-sm font-semibold text-sm"
          >
            <Plus size={18} />
            <span>新增线索</span>
          </button>
          <button 
            onClick={onImport}
            className="bg-[#E5E7EB] text-gray-700 px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-gray-300 transition-all shadow-sm font-semibold text-sm"
          >
            <FileText size={18} />
            <span>导入Excel</span>
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-[#F8F9FA] p-8 rounded-2xl border border-gray-100 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-end">
          <div>
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 block">搜索线索</label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="客户名称 / 手机号" 
                className="w-full pl-12 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#007A41] text-gray-600 font-medium"
              />
            </div>
          </div>
          <div>
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 block">线索来源</label>
            <div className="relative">
              <select className="w-full appearance-none bg-white border border-gray-100 rounded-xl px-5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#007A41] text-gray-600 font-medium">
                <option>全部来源</option>
                <option>官网咨询</option>
                <option>线下展会</option>
                <option>线上推广</option>
                <option>转介绍</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
          </div>
          <div>
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 block">创建日期</label>
            <div className="relative">
              <input 
                type="date" 
                className="w-full px-4 py-2.5 bg-white border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#007A41] text-gray-600 font-medium"
              />
            </div>
          </div>
          <button className="bg-[#007A41] text-white py-2.5 rounded-xl font-bold text-sm hover:bg-[#006335] transition-all shadow-lg shadow-[#007A41]/20">
            查询线索
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-8 py-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div 
                onClick={toggleSelectAll}
                className={`w-4 h-4 border-2 rounded cursor-pointer transition-colors flex items-center justify-center ${
                  selectedRows.length === leads.length ? 'bg-[#007A41] border-[#007A41]' : 'border-gray-200 hover:border-[#007A41]'
                }`}
              >
                {selectedRows.length === leads.length && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
              </div>
              <span className="text-xs font-bold text-gray-400">全选</span>
            </div>
            <div className="h-4 w-px bg-gray-200 mx-2"></div>
            <button 
              disabled={selectedRows.length === 0}
              className="text-xs font-bold text-gray-400 hover:text-[#007A41] transition-colors flex items-center gap-1.5 disabled:opacity-50"
            >
              批量领取
            </button>
            <button 
              disabled={selectedRows.length === 0}
              className="text-xs font-bold text-gray-400 hover:text-[#007A41] transition-colors flex items-center gap-1.5 disabled:opacity-50"
            >
              批量分配
            </button>
          </div>
          <div className="text-[11px] text-gray-400 font-medium">
            已选择 <span className="text-[#007A41] font-bold">{selectedRows.length}</span> 条线索
          </div>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F9FAFB] border-b border-gray-100">
              <th className="pl-8 pr-4 py-5 w-10"></th>
              <th className="px-4 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">客户名称</th>
              <th className="px-4 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">联系人</th>
              <th className="px-4 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">手机号</th>
              <th className="px-4 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">线索来源</th>
              <th className="px-4 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">状态</th>
              <th className="px-4 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">创建时间</th>
              <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {leads.map((lead, i) => (
              <tr key={i} className={`hover:bg-gray-50 transition-colors group ${selectedRows.includes(i) ? 'bg-[#F0F9F4]' : ''}`}>
                <td className="pl-8 pr-4 py-6">
                  <div 
                    onClick={() => toggleSelectRow(i)}
                    className={`w-4 h-4 border-2 rounded cursor-pointer transition-colors flex items-center justify-center ${
                      selectedRows.includes(i) ? 'bg-[#007A41] border-[#007A41]' : 'border-gray-200 hover:border-[#007A41]'
                    }`}
                  >
                    {selectedRows.includes(i) && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                  </div>
                </td>
                <td className="px-4 py-6 text-sm font-medium text-gray-700">{lead.name}</td>
                <td className="px-4 py-6 text-sm text-gray-600 font-medium">{lead.contact}</td>
                <td className="px-4 py-6 text-sm text-gray-600 tabular-nums font-medium">{lead.phone}</td>
                <td className="px-4 py-6">
                  <span className="px-3 py-1 rounded bg-[#F3F4F6] text-gray-500 text-[11px] font-bold border border-gray-100">
                    {lead.source}
                  </span>
                </td>
                <td className="px-4 py-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#FF6B35]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]"></span>
                    {lead.status}
                  </div>
                </td>
                <td className="px-4 py-6 text-sm text-gray-400 font-medium">{lead.time}</td>
                <td className="px-8 py-6 text-right">
                  <button className="bg-[#E6F9F0] text-[#00C068] px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-[#00C068] hover:text-white transition-all">
                    立即领取
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Pagination */}
        <div className="px-8 py-5 bg-[#F9FAFB] border-t border-gray-100 flex items-center justify-between">
          <div className="text-[11px] text-gray-400 font-medium">
            显示第 <span className="text-gray-900">1</span> 到 <span className="text-gray-900">5</span> 条，共 128 条线索
          </div>
          <div className="flex items-center gap-2.5">
            <button className="p-1.5 text-gray-300 hover:text-gray-900 disabled:opacity-30 transition-colors" disabled>&lt;</button>
            {[1, 2, 3, '...', 26].map((page, i) => (
              <button 
                key={i}
                className={`w-8 h-8 rounded-lg text-[11px] font-bold transition-all ${
                  page === 1 ? 'bg-[#007A41] text-white shadow-lg shadow-[#007A41]/20' : 'text-gray-400 hover:bg-gray-200'
                }`}
              >
                {page}
              </button>
            ))}
            <button className="p-1.5 text-gray-300 hover:text-gray-900 transition-colors">&gt;</button>
          </div>
        </div>
      </div>
    </>
  );
}

function ProductsView({ onAdd, onViewDetail }: { onAdd: () => void, onViewDetail: (product: any) => void }) {
  const products = [
    { id: 'PROD-001', name: '智能工业网关 G100', type: '硬件产品', code: 'GW-G100-V1', price: '1,299.00', status: '上架', owner: 'admin', updateTime: '2024-03-01 10:00' },
    { id: 'PROD-002', name: '云端数据分析平台', type: '软件服务', code: 'SW-DAP-SaaS', price: '9,800.00/年', status: '上架', owner: 'admin', updateTime: '2024-03-01 11:30' },
    { id: 'PROD-003', name: '工业物联网咨询方案', type: '咨询服务', code: 'CS-IIOT-01', price: '50,000.00', status: '下架', owner: 'admin', updateTime: '2024-02-28 15:20' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="搜索产品名称 / 编码..." 
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#22c55e]/20 focus:border-[#22c55e] transition-all font-medium"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">
            <Filter size={18} />
            筛选
          </button>
        </div>
        <button 
          onClick={onAdd}
          className="flex items-center gap-2 px-6 py-3 bg-[#22c55e] text-white rounded-2xl text-sm font-bold shadow-lg shadow-[#22c55e]/20 hover:bg-[#16a34a] transition-all"
        >
          <Plus size={18} />
          新建产品
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">产品名称</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">产品类型</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">产品编码</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">价格</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">状态</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">负责人</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">更新时间</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <span className="text-sm font-bold text-gray-900">{product.name}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">{product.type}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-mono text-gray-500">{product.code}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-bold text-gray-900">¥{product.price}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider ${
                    product.status === '上架' ? 'bg-[#E6F9F0] text-[#00C068]' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-[10px] font-bold text-gray-500">
                      {product.owner[0].toUpperCase()}
                    </div>
                    <span className="text-sm text-gray-600">{product.owner}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-400">{product.updateTime}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => onViewDetail(product)}
                    className="p-2 text-gray-400 hover:text-[#22c55e] hover:bg-[#E6F9F0] rounded-xl transition-all"
                  >
                    <ArrowUpRight size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ProductDetailView({ product, onBack }: { product: any, onBack: () => void }) {
  if (!product) return null;

  return (
    <div className="flex flex-col h-full bg-[#F9FAFB]">
      <div className="px-8 py-6 bg-white border-b border-gray-100">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
          <button onClick={onBack} className="hover:text-[#22c55e]">产品管理</button>
          <ChevronRight size={12} />
          <span className="text-gray-900 font-medium">产品详情</span>
        </div>

        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
              <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider ${
                product.status === '上架' ? 'bg-[#E6F9F0] text-[#00C068]' : 'bg-gray-100 text-gray-500'
              }`}>
                {product.status}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Package size={14} />
                <span>编码: {product.code}</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="flex items-center gap-2">
                <LayoutGrid size={14} />
                <span>类型: {product.type}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-6 py-2 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all flex items-center gap-2">
              <Edit3 size={16} />
              编辑产品
            </button>
            <button className="px-6 py-2 border border-red-100 text-red-500 rounded-xl text-sm font-bold hover:bg-red-50 transition-all flex items-center gap-2">
              <Trash2 size={16} />
              删除产品
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-6">
        <div className="grid grid-cols-3 gap-6 text-left">
          <div className="col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-8">基本信息</h3>
              <div className="grid grid-cols-2 gap-y-8 gap-x-12">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">产品名称</p>
                  <p className="text-sm font-bold text-gray-900">{product.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">产品类型</p>
                  <p className="text-sm font-bold text-gray-900">{product.type}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">产品编码</p>
                  <p className="text-sm font-bold text-gray-900">{product.code}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">销售价格</p>
                  <p className="text-sm font-bold text-gray-900">¥{product.price}</p>
                </div>
                <div className="space-y-1 col-span-2">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">产品描述</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    这是一款高性能的工业级网关产品，支持多种协议转换，具备强大的边缘计算能力，适用于各种复杂的工业物联网场景。
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-8">系统信息</h3>
              <div className="grid grid-cols-2 gap-y-8 gap-x-12">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">创建人</p>
                  <p className="text-sm font-bold text-gray-900">admin</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">创建时间</p>
                  <p className="text-sm font-bold text-gray-900">2024-01-15 14:30:00</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">最后修改人</p>
                  <p className="text-sm font-bold text-gray-900">admin</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">最后修改时间</p>
                  <p className="text-sm font-bold text-gray-900">{product.updateTime}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6">附件部分</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-[#22c55e] hover:text-[#22c55e] transition-all cursor-pointer">
                  <Plus size={24} />
                  <span className="text-xs font-bold">上传附件</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-red-500 shadow-sm">
                      <FileText size={16} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900">产品规格书.pdf</p>
                      <p className="text-[10px] text-gray-400">2.4 MB</p>
                    </div>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors">
                    <Download size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LeadFormModal({ onClose, lead }: { onClose: () => void, lead?: any }) {
  const isEdit = !!lead;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">{isEdit ? '编辑线索' : '新建线索'}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-900 transition-colors">
            <Plus className="rotate-45" size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-5 bg-[#007A41] rounded-full" />
              <h4 className="font-bold text-gray-900">基本信息</h4>
            </div>

            <div className="grid grid-cols-2 gap-x-12 gap-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">线索名称 <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="输入线索名称" 
                    defaultValue={lead?.name}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#007A41] text-sm" 
                  />
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">联系人</label>
                <input 
                  type="text" 
                  placeholder="输入联系人姓名" 
                  defaultValue={lead?.contact}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#007A41] text-sm" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">线索来源</label>
                <div className="relative">
                  <select 
                    defaultValue={lead?.source === '官' ? '官网咨询' : lead?.source === '推' ? '转介绍' : '请选择来源'}
                    className="w-full appearance-none px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#007A41] text-sm text-gray-500"
                  >
                    <option>请选择来源</option>
                    <option>官网咨询</option>
                    <option>线下展会</option>
                    <option>线上推广</option>
                    <option>转介绍</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">手机 <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  placeholder="输入手机号" 
                  defaultValue={lead?.phone}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#007A41] text-sm" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">企业Logo</label>
                <div className="border-2 border-dashed border-gray-100 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-[#E6F9F0] text-[#007A41] flex items-center justify-center">
                    <Plus size={24} />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-bold text-gray-500">点击上传或拖拽图片</p>
                    <p className="text-[10px] text-gray-300 mt-1 uppercase tracking-widest">JPG, PNG (Max 2MB)</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">负责人 <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={lead?.owner || "admin"} 
                      readOnly 
                      className="w-full px-4 py-2.5 bg-gray-100 border border-gray-100 rounded-xl outline-none text-sm text-gray-600" 
                    />
                    <User className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">客户级别</label>
                  <div className="relative">
                    <select className="w-full appearance-none px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#007A41] text-sm text-gray-500">
                      <option>选择级别</option>
                      <option>A (重点客户)</option>
                      <option>B (普通客户)</option>
                      <option>C (一般客户)</option>
                    </select>
                    <HelpCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">客户行业</label>
                <div className="relative">
                  <select 
                    defaultValue={lead?.industry || "选择行业"}
                    className="w-full appearance-none px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#007A41] text-sm text-gray-500"
                  >
                    <option>选择行业</option>
                    <option>IT/软件</option>
                    <option>制造业</option>
                    <option>金融业</option>
                    <option>教育培训</option>
                  </select>
                  <LayoutGrid className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">邮箱</label>
                <input type="email" placeholder="example@company.com" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#007A41] text-sm" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">下次联系时间</label>
                <div className="relative">
                  <input type="date" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#007A41] text-sm" />
                </div>
              </div>

              <div className="col-span-2 space-y-2">
                <label className="text-sm font-medium text-gray-700">详细地址</label>
                <input 
                  type="text" 
                  placeholder="输入详细地址" 
                  defaultValue={lead?.address || '广东省深圳市南山区科技园北区'}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#007A41] text-sm" 
                />
              </div>

              <div className="col-span-2 space-y-2">
                <label className="text-sm font-medium text-gray-700">备注</label>
                <textarea 
                  placeholder="输入备注信息" 
                  defaultValue={lead?.remark || '该客户对我们的智能制造解决方案非常感兴趣，需要重点跟进。'}
                  rows={3}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#007A41] text-sm resize-none" 
                />
              </div>
            </div>
          </section>
        </div>

        <div className="px-8 py-6 border-t border-gray-100 flex items-center justify-end gap-4 bg-gray-50/30">
          <button onClick={onClose} className="px-8 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">取消</button>
          {!isEdit && (
            <button onClick={onClose} className="px-8 py-2.5 text-sm font-bold text-[#007A41] hover:bg-[#E6F9F0] rounded-xl transition-all">保存并继续新增</button>
          )}
          <button onClick={onClose} className="bg-[#007A41] text-white px-10 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-[#007A41]/20 hover:bg-[#006335] transition-all">保存</button>
        </div>
      </motion.div>
    </div>
  );
}

function UserSelectionModal({ type, onClose }: { type: 'owner' | 'collaborator', onClose: () => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const users = [
    { id: 1, name: '陈晓明', role: '高级销售总监', avatar: 'https://picsum.photos/seed/user1/40/40' },
    { id: 2, name: '王大伟', role: '销售经理', avatar: 'https://picsum.photos/seed/user2/40/40' },
    { id: 3, name: '李小龙', role: '销售主管', avatar: 'https://picsum.photos/seed/user3/40/40' },
    { id: 4, name: '张三', role: '客户经理', avatar: 'https://picsum.photos/seed/user4/40/40' },
    { id: 5, name: '李四', role: '销售专员', avatar: 'https://picsum.photos/seed/user5/40/40' },
  ];

  const filteredUsers = users.filter(user => 
    user.name.includes(searchQuery) || user.role.includes(searchQuery)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
      >
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">
            {type === 'owner' ? '更换负责人' : '添加协作人'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-900 transition-colors">
            <Plus className="rotate-45" size={24} />
          </button>
        </div>

        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="搜索姓名或职位..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#22c55e] transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredUsers.map((user) => (
            <button
              key={user.id}
              onClick={() => setSelectedUserId(user.id)}
              className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all ${
                selectedUserId === user.id 
                  ? 'bg-[#F0FDF4] border border-[#22c55e]/20' 
                  : 'hover:bg-gray-50 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border border-white shadow-sm">
                  <img src={user.avatar} alt={user.name} referrerPolicy="no-referrer" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-gray-900">{user.name}</p>
                  <p className="text-[10px] text-gray-400 font-medium">{user.role}</p>
                </div>
              </div>
              {selectedUserId === user.id && (
                <div className="w-5 h-5 bg-[#22c55e] rounded-full flex items-center justify-center text-white">
                  <Check size={12} strokeWidth={3} />
                </div>
              )}
            </button>
          ))}
          {filteredUsers.length === 0 && (
            <div className="py-12 text-center text-gray-400 text-sm">
              未找到相关人员
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50/30">
          <button onClick={onClose} className="px-6 py-2 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">取消</button>
          <button 
            disabled={!selectedUserId}
            onClick={onClose} 
            className={`px-8 py-2 rounded-xl font-bold text-sm transition-all ${
              selectedUserId 
                ? 'bg-[#22c55e] text-white shadow-lg shadow-[#22c55e]/20 hover:bg-[#16a34a]' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            确定
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function LeadDetailView({ 
  lead, 
  onBack, 
  onEdit,
  onChangeOwner,
  onAddCollaborator
}: { 
  lead: any, 
  onBack: () => void, 
  onEdit: () => void,
  onChangeOwner: () => void,
  onAddCollaborator: () => void
}) {
  if (!lead) return null;

  return (
    <div className="space-y-8 pb-12">
      <nav className="flex items-center gap-2 text-[11px] text-gray-400 mb-2 font-medium">
        <button onClick={onBack} className="hover:text-[#007A41] transition-colors">CRM</button>
        <span className="text-gray-300">/</span>
        <button onClick={onBack} className="hover:text-[#007A41] transition-colors">线索管理</button>
        <span className="text-gray-300">/</span>
        <button onClick={onBack} className="hover:text-[#007A41] transition-colors">线索</button>
        <span className="text-gray-300">/</span>
        <span className="text-[#007A41]">详情</span>
      </nav>

      {/* Header Card */}
      <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-[#F0F9F4] text-[#007A41] flex items-center justify-center shadow-inner">
            <Target size={32} />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-2xl font-bold text-gray-900">{lead.name}</h2>
              <span className="px-3 py-1 rounded-full bg-[#EBF2FF] text-[#4E8DFF] text-[10px] font-bold">跟进中</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
              <div className="flex items-center gap-1.5">
                <User size={14} className="text-gray-300" />
                <span>联系人：{lead.contact}</span>
              </div>
              <div className="h-3 w-px bg-gray-200" />
              <div className="flex items-center gap-1.5">
                <Phone size={14} className="text-gray-300" />
                <span>手机号：{lead.phone}</span>
              </div>
              <div className="h-3 w-px bg-gray-200" />
              <div className="flex items-center gap-1.5">
                <UserPlus size={14} className="text-gray-300" />
                <span>负责人：{lead.owner}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={onEdit}
            className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50 border border-gray-100 rounded-lg transition-all flex items-center gap-2"
          >
            <Edit3 size={14} />
            编辑
          </button>
          <button 
            onClick={onChangeOwner}
            className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50 border border-gray-100 rounded-lg transition-all flex items-center gap-2"
          >
            <RefreshCw size={14} />
            更换负责人
          </button>
          <button 
            onClick={onAddCollaborator}
            className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50 border border-gray-100 rounded-lg transition-all flex items-center gap-2"
          >
            <UserPlus size={14} />
            添加协作人
          </button>
          <button className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50 border border-gray-100 rounded-lg transition-all flex items-center gap-2">
            <ArrowLeft size={14} />
            放回线索池
          </button>
          <button className="px-6 py-2 text-xs font-bold bg-[#007A41] text-white rounded-lg hover:bg-[#006335] transition-all shadow-lg shadow-[#007A41]/20 flex items-center gap-2">
            <CheckCircle2 size={14} />
            转换为客户
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Basic Info */}
          <section className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-5 bg-[#007A41] rounded-full" />
              <h3 className="font-bold text-gray-900">基本信息</h3>
            </div>
            <div className="grid grid-cols-2 gap-y-6 gap-x-12">
              {[
                { label: '企业名称', value: lead.name },
                { label: '联系人', value: lead.contact },
                { label: '手机号', value: lead.phone },
                { label: '线索来源', value: lead.source === '官' ? '官网咨询' : lead.source === '推' ? '转介绍' : '其他' },
                { label: '详细地址', value: lead.address || '广东省深圳市南山区科技园北区' },
                { label: '备注', value: lead.remark || '该客户对我们的智能制造解决方案非常感兴趣，需要重点跟进。' },
              ].map((item, i) => (
                <div key={i} className="space-y-1.5">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.label}</p>
                  <p className="text-sm font-medium text-gray-700">{item.value}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Owner Info */}
          <section className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-5 bg-[#007A41] rounded-full" />
              <h3 className="font-bold text-gray-900">负责人信息</h3>
            </div>
            <div className="grid grid-cols-3 gap-8">
              {[
                { label: '当前负责人', value: lead.owner },
                { label: '创建时间', value: '2023-10-24 14:30:22' },
                { label: '最后跟进', value: lead.time },
              ].map((item, i) => (
                <div key={i} className="space-y-1.5">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.label}</p>
                  <p className="text-sm font-medium text-gray-700">{item.value}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Follow-up Timeline */}
          <section className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-1 h-5 bg-[#007A41] rounded-full" />
                <h3 className="font-bold text-gray-900">跟进记录</h3>
              </div>
              <button className="text-xs font-bold text-[#007A41] hover:underline">查看全部</button>
            </div>
            
            <div className="space-y-8 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-50">
              {[
                { type: '电话跟进', content: '与客户张总进行了电话沟通，确认了初步需求，对方表示下周可以安排面谈。', time: '2023-10-24 14:30', user: '陈晓明', icon: Phone },
                { type: '微信跟进', content: '发送了公司介绍PPT和产品报价单，客户已确认收到。', time: '2023-10-23 10:15', user: '陈晓明', icon: MessageSquare },
                { type: '系统创建', content: '线索由管理员手动创建。', time: '2023-10-22 09:00', user: 'admin', icon: Plus },
              ].map((record, i) => (
                <div key={i} className="relative pl-12">
                  <div className={`absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-sm z-10 ${
                    record.type === '系统创建' ? 'bg-gray-100 text-gray-400' : 'bg-[#E6F9F0] text-[#007A41]'
                  }`}>
                    <record.icon size={16} />
                  </div>
                  <div className="bg-gray-50/50 rounded-2xl p-5 border border-gray-50 hover:border-gray-100 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-gray-900">{record.user}</span>
                        <span className="px-2 py-0.5 rounded bg-white border border-gray-100 text-[9px] font-bold text-gray-400 uppercase tracking-wider">{record.type}</span>
                      </div>
                      <span className="text-[10px] font-bold text-gray-300 tabular-nums">{record.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{record.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Quick Follow-up */}
          <section className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm sticky top-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-5 bg-[#007A41] rounded-full" />
              <h3 className="font-bold text-gray-900">快速跟进</h3>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">跟进内容</label>
                <textarea 
                  placeholder="输入跟进详情..." 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#007A41] text-sm h-32 resize-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">跟进方式</label>
                <div className="relative">
                  <select className="w-full appearance-none px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#007A41] text-sm text-gray-600 font-medium">
                    <option>电话跟进</option>
                    <option>微信跟进</option>
                    <option>面谈跟进</option>
                    <option>邮件跟进</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">联系人</label>
                <div className="relative">
                  <select className="w-full appearance-none px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#007A41] text-sm text-gray-600 font-medium">
                    <option>{lead.contact}</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>
              <button className="w-full bg-[#007A41] text-white py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-[#007A41]/20 hover:bg-[#006335] transition-all mt-4">
                提交跟进
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function ImportExcelModal({ type, onClose }: { type: 'lead' | 'customer', onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [isUploading, setIsUploading] = useState(false);

  const title = type === 'lead' ? '导入线索' : '导入客户';
  const templateName = type === 'lead' ? '《线索导入模板》' : '《客户导入模板》';

  const handleNext = () => {
    if (step < 3) {
      setIsUploading(true);
      setTimeout(() => {
        setStep(step + 1);
        setIsUploading(false);
      }, 1500);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
      >
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#E6F9F0] text-[#007A41] flex items-center justify-center">
              <FileSpreadsheet size={18} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-900 transition-colors">
            <Plus className="rotate-45" size={24} />
          </button>
        </div>

        <div className="p-8 space-y-10">
          {/* Steps Indicator */}
          <div className="flex items-center justify-between relative px-10">
            <div className="absolute top-5 left-20 right-20 h-0.5 bg-gray-100 -z-10" />
            {[
              { num: 1, label: '上传文件' },
              { num: 2, label: '导入数据' },
              { num: 3, label: '导入完成' }
            ].map((s) => (
              <div key={s.num} className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  step >= s.num ? 'bg-[#007A41] text-white shadow-lg shadow-[#007A41]/20' : 'bg-gray-100 text-gray-400'
                }`}>
                  {step > s.num ? <CheckCircle2 size={18} /> : s.num}
                </div>
                <span className={`text-xs font-bold ${step >= s.num ? 'text-[#007A41]' : 'text-gray-400'}`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="bg-[#F0F9F4] p-6 rounded-2xl flex items-start gap-4 border border-[#007A41]/10">
                  <HelpCircle size={20} className="text-[#007A41] shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700 leading-relaxed">
                      请按照数据模板的格式准备要导入的数据。
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <button className="text-[#007A41] font-bold text-xs flex items-center gap-1.5 hover:underline">
                        <Download size={14} /> 点击下载{templateName}
                      </button>
                      <span className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">2MB/10,000 条</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-bold text-gray-700">请选择数据重复时的处理方式</label>
                  <div className="relative">
                    <select className="w-full appearance-none px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#007A41] text-sm text-gray-600 font-medium">
                      <option>更新系统原有数据</option>
                      <option>跳过重复数据</option>
                      <option>覆盖所有数据</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-bold text-gray-700">请选择需要导入的文件</label>
                  <div className="border-2 border-dashed border-gray-100 rounded-2xl p-10 flex flex-col items-center justify-center gap-4 bg-gray-50/50 hover:bg-gray-50 transition-all cursor-pointer group">
                    <div className="w-16 h-16 rounded-2xl bg-white text-gray-300 flex items-center justify-center group-hover:text-[#007A41] group-hover:scale-110 transition-all shadow-sm">
                      <FileSpreadsheet size={32} />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-gray-500">点击上传或拖拽文件到这里</p>
                      <p className="text-[10px] text-gray-300 mt-1 font-medium uppercase tracking-widest">支持 XLS, XLSX 格式</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8 py-10 flex flex-col items-center"
              >
                <div className="w-20 h-20 rounded-full border-4 border-[#E6F9F0] border-t-[#007A41] animate-spin" />
                <div className="text-center space-y-2">
                  <h4 className="text-lg font-bold text-gray-900">正在解析并导入数据...</h4>
                  <p className="text-sm text-gray-400 font-medium">已处理 4,281 / 10,000 条数据</p>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '42%' }}
                    className="h-full bg-[#007A41]"
                  />
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8 py-10 flex flex-col items-center"
              >
                <div className="w-20 h-20 rounded-full bg-[#E6F9F0] text-[#007A41] flex items-center justify-center shadow-lg shadow-[#007A41]/10">
                  <CheckCircle2 size={40} />
                </div>
                <div className="text-center space-y-2">
                  <h4 className="text-xl font-bold text-gray-900">数据导入成功！</h4>
                  <p className="text-sm text-gray-500 font-medium">
                    本次共成功导入 <span className="text-[#007A41] font-bold">9,842</span> 条记录，
                    跳过 <span className="text-[#FF922B] font-bold">158</span> 条重复数据。
                  </p>
                </div>
                <div className="flex gap-4">
                  <button className="px-6 py-2.5 bg-gray-100 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-200 transition-colors">查看导入日志</button>
                  <button onClick={onClose} className="px-6 py-2.5 bg-[#007A41] text-white rounded-xl text-sm font-bold hover:bg-[#006335] transition-all shadow-lg shadow-[#007A41]/20">完成</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="px-8 py-6 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
          <button className="text-[#007A41] text-sm font-bold hover:underline">查看历史导入记录</button>
          <div className="flex gap-4">
            {step === 1 && (
              <>
                <button onClick={onClose} className="px-8 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">取消</button>
                <button 
                  onClick={handleNext}
                  disabled={isUploading}
                  className="bg-[#007A41] text-white px-10 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-[#007A41]/20 hover:bg-[#006335] transition-all flex items-center gap-2"
                >
                  {isUploading ? <RefreshCw size={16} className="animate-spin" /> : null}
                  <span>立即导入</span>
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function PublicPoolView({ onAdd, onImport }: { onAdd: () => void, onImport: () => void }) {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const poolCustomers = [
    { name: '绿野科技有限公司', contact: '张静秋', phone: '138****5521', source: '官网咨询', status: '待分配', time: '2023-10-24 14:30' },
    { name: '深蓝建工集团', contact: '李博文', phone: '159****8823', source: '线下展会', status: '待分配', time: '2023-10-24 11:15' },
    { name: '恒达贸易有限公司', contact: '王思萌', phone: '131****0091', source: '线上推广', status: '待分配', time: '2023-10-23 17:45' },
    { name: '极光数字科技', contact: '赵云凡', phone: '137****4432', source: '转介绍', status: '待分配', time: '2023-10-23 09:20' },
    { name: '天宇教育咨询', contact: '孙立群', phone: '188****6721', source: '官网咨询', status: '待分配', time: '2023-10-22 15:55' },
  ];

  const toggleSelectAll = () => {
    if (selectedRows.length === poolCustomers.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(poolCustomers.map((_, i) => i));
    }
  };

  const toggleSelectRow = (index: number) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter(i => i !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };

  return (
    <>
      <nav className="flex items-center gap-2 text-[11px] text-gray-400 mb-2 font-medium">
        <span>CRM</span>
        <span className="text-gray-300">/</span>
        <span className="text-[#007A41]">客户管理</span>
        <span className="text-gray-300">/</span>
        <span className="text-[#007A41]">公海池</span>
      </nav>

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">公海池</h2>
        <div className="flex gap-3">
          <button 
            onClick={onAdd}
            className="bg-[#007A41] text-white px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-[#006335] transition-all shadow-sm font-semibold text-sm"
          >
            <Plus size={18} />
            <span>新增客户</span>
          </button>
          <button 
            onClick={onImport}
            className="bg-gray-100 text-gray-600 px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-gray-200 transition-all font-semibold text-sm"
          >
            <FileSpreadsheet size={18} />
            <span>导入Excel</span>
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-end">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">搜索客户</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="客户名称 / 手机号..." 
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#007A41] text-sm" 
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">客户来源</label>
            <div className="relative">
              <select className="w-full appearance-none px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#007A41] text-sm text-gray-600 font-medium">
                <option>全部来源</option>
                <option>官网咨询</option>
                <option>线下展会</option>
                <option>线上推广</option>
                <option>转介绍</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
          </div>
          <div>
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 block">创建日期</label>
            <div className="relative">
              <input 
                type="date" 
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#007A41] text-sm" 
              />
            </div>
          </div>
          <button className="bg-[#007A41] text-white py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-[#007A41]/20 hover:bg-[#006335] transition-all">
            查询客户
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden relative">
        <div className="px-8 py-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div 
                onClick={toggleSelectAll}
                className={`w-4 h-4 border-2 rounded cursor-pointer transition-colors flex items-center justify-center ${
                  selectedRows.length === poolCustomers.length ? 'bg-[#007A41] border-[#007A41]' : 'border-gray-200 hover:border-[#007A41]'
                }`}
              >
                {selectedRows.length === poolCustomers.length && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
              </div>
              <span className="text-xs font-bold text-gray-400">全选</span>
            </div>
            <div className="h-4 w-px bg-gray-200 mx-2"></div>
            <button 
              disabled={selectedRows.length === 0}
              className="text-xs font-bold text-gray-400 hover:text-[#007A41] transition-colors flex items-center gap-1.5 disabled:opacity-50"
            >
              批量领取
            </button>
            <button 
              disabled={selectedRows.length === 0}
              className="text-xs font-bold text-gray-400 hover:text-[#007A41] transition-colors flex items-center gap-1.5 disabled:opacity-50"
            >
              批量分配
            </button>
          </div>
          <div className="text-[11px] text-gray-400 font-medium">
            已选择 <span className="text-[#007A41] font-bold">{selectedRows.length}</span> 条记录
          </div>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F9FAFB] border-b border-gray-100">
              <th className="pl-8 pr-4 py-5 w-10"></th>
              <th className="px-4 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">客户名称</th>
              <th className="px-4 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">联系人</th>
              <th className="px-4 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">手机号码</th>
              <th className="px-4 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">客户来源</th>
              <th className="px-4 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">状态</th>
              <th className="px-4 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">创建时间</th>
              <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {poolCustomers.map((customer, i) => (
              <tr key={i} className={`hover:bg-gray-50 transition-colors group ${selectedRows.includes(i) ? 'bg-[#F0F9F4]' : ''}`}>
                <td className="pl-8 pr-4 py-6">
                  <div 
                    onClick={() => toggleSelectRow(i)}
                    className={`w-4 h-4 border-2 rounded cursor-pointer transition-colors flex items-center justify-center ${
                      selectedRows.includes(i) ? 'bg-[#007A41] border-[#007A41]' : 'border-gray-200 hover:border-[#007A41]'
                    }`}
                  >
                    {selectedRows.includes(i) && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                  </div>
                </td>
                <td className="px-4 py-6">
                  <div className="font-bold text-gray-900 text-sm">{customer.name}</div>
                </td>
                <td className="px-4 py-6 text-sm text-gray-600 font-medium">{customer.contact}</td>
                <td className="px-4 py-6 text-sm text-gray-600 tabular-nums font-medium">{customer.phone}</td>
                <td className="px-4 py-6">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-gray-100 text-gray-500">
                    {customer.source}
                  </span>
                </td>
                <td className="px-4 py-6">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF922B]" />
                    <span className="text-[10px] font-bold text-[#FF922B]">{customer.status}</span>
                  </div>
                </td>
                <td className="px-4 py-6 text-sm text-gray-400 font-medium">{customer.time}</td>
                <td className="px-8 py-6 text-right">
                  <button className="bg-[#E6F9F0] text-[#007A41] px-4 py-1.5 rounded-md text-[10px] font-bold hover:bg-[#007A41] hover:text-white transition-all">
                    立即领取
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Pagination */}
        <div className="px-8 py-5 bg-[#F9FAFB] border-t border-gray-100 flex items-center justify-between">
          <div className="text-[11px] text-gray-400 font-medium">
            显示第 <span className="text-gray-900">1</span> 到 <span className="text-gray-900">5</span> 条，共 128 条记录
          </div>
          <div className="flex items-center gap-2.5">
            <button className="p-1.5 text-gray-300 hover:text-gray-900 disabled:opacity-30 transition-colors" disabled>&lt;</button>
            {[1, 2, 3, '...', 26].map((page, i) => (
              <button 
                key={i}
                className={`w-8 h-8 rounded-lg text-[11px] font-bold transition-all ${
                  page === 1 ? 'bg-[#007A41] text-white shadow-lg shadow-[#007A41]/20' : 'text-gray-400 hover:bg-gray-200'
                }`}
              >
                {page}
              </button>
            ))}
            <button className="p-1.5 text-gray-300 hover:text-gray-900 transition-colors">&gt;</button>
          </div>
        </div>
      </div>
    </>
  );
}

function CustomerDetailView({ 
  customer, 
  onBack,
  onGenerateOpportunity
}: { 
  customer: any, 
  onBack: () => void,
  onGenerateOpportunity: () => void
}) {
  if (!customer) return null;

  return (
    <div className="space-y-8 pb-12">
      <nav className="flex items-center gap-2 text-[11px] text-gray-400 mb-2 font-medium">
        <button onClick={onBack} className="hover:text-[#007A41] transition-colors">CRM</button>
        <span className="text-gray-300">/</span>
        <button onClick={onBack} className="hover:text-[#007A41] transition-colors">客户管理</button>
        <span className="text-gray-300">/</span>
        <button onClick={onBack} className="hover:text-[#007A41] transition-colors">客户</button>
        <span className="text-gray-300">/</span>
        <span className="text-[#007A41]">详情</span>
      </nav>

      {/* Header Card */}
      <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-[#E6F9F0] text-[#007A41] flex items-center justify-center shadow-inner">
            <Users size={32} />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-2xl font-bold text-gray-900">{customer.name}</h2>
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                customer.dealStatus === '成交' ? 'bg-[#E6F9F0] text-[#00C068]' : 'bg-[#FFF9F2] text-[#FF922B]'
              }`}>
                {customer.dealStatus}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
              <div className="flex items-center gap-1.5">
                <User size={14} className="text-gray-300" />
                <span>联系人：{customer.contact}</span>
              </div>
              <div className="h-3 w-px bg-gray-200" />
              <div className="flex items-center gap-1.5">
                <Phone size={14} className="text-gray-300" />
                <span>手机号：{customer.phone}</span>
              </div>
              <div className="h-3 w-px bg-gray-200" />
              <div className="flex items-center gap-1.5">
                <LayoutGrid size={14} className="text-gray-300" />
                <span>行业：{customer.industry}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50 border border-gray-100 rounded-lg transition-all flex items-center gap-2">
            <RefreshCw size={14} />
            变更负责人
          </button>
          <button className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50 border border-gray-100 rounded-lg transition-all flex items-center gap-2">
            <UserPlus size={14} />
            共享客户
          </button>
          <button className="px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-50 border border-red-100 rounded-lg transition-all flex items-center gap-2">
            <Trash2 size={14} />
            移入公海
          </button>
          <button 
            onClick={onGenerateOpportunity}
            className="px-6 py-2 text-xs font-bold bg-[#007A41] text-white rounded-lg hover:bg-[#006335] transition-all shadow-lg shadow-[#007A41]/20 flex items-center gap-2"
          >
            <Briefcase size={14} />
            生成商机
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Basic Info */}
          <section className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-5 bg-[#007A41] rounded-full" />
              <h3 className="font-bold text-gray-900">基本信息</h3>
            </div>
            <div className="grid grid-cols-2 gap-y-6 gap-x-12">
              {[
                { label: '客户名称', value: customer.name },
                { label: '所属行业', value: customer.industry },
                { label: '联系人', value: customer.contact },
                { label: '手机号码', value: customer.phone },
                { label: '客户级别', value: customer.level },
                { label: '成交状态', value: customer.dealStatus },
                { label: '客户来源', value: '官网咨询' },
                { label: '详细地址', value: '上海市浦东新区张江高科技园区' },
              ].map((item, i) => (
                <div key={i} className="space-y-1.5">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.label}</p>
                  <p className="text-sm font-medium text-gray-700">{item.value}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Follow-up Timeline */}
          <section className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-1 h-5 bg-[#007A41] rounded-full" />
                <h3 className="font-bold text-gray-900">跟进记录</h3>
              </div>
              <button className="text-xs font-bold text-[#007A41] hover:underline">查看全部</button>
            </div>
            
            <div className="space-y-8 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-50">
              {[
                { type: '面谈跟进', content: '前往客户公司进行了产品演示，对方对我们的自动化模块非常认可，正在走内部审批流程。', time: '2023-11-24 10:30', user: '陈晓明', icon: User },
                { type: '电话跟进', content: '沟通了合同细节，对方希望在维保期上再增加一年。', time: '2023-11-20 15:45', user: '陈晓明', icon: Phone },
                { type: '系统创建', content: '客户由线索转换而来。', time: '2023-11-15 09:00', user: 'admin', icon: Plus },
              ].map((record, i) => (
                <div key={i} className="relative pl-12">
                  <div className={`absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-sm z-10 ${
                    record.type === '系统创建' ? 'bg-gray-100 text-gray-400' : 'bg-[#E6F9F0] text-[#007A41]'
                  }`}>
                    <record.icon size={16} />
                  </div>
                  <div className="bg-gray-50/50 rounded-2xl p-5 border border-gray-50 hover:border-gray-100 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-gray-900">{record.user}</span>
                        <span className="px-2 py-0.5 rounded bg-white border border-gray-100 text-[9px] font-bold text-gray-400 uppercase tracking-wider">{record.type}</span>
                      </div>
                      <span className="text-[10px] font-bold text-gray-300 tabular-nums">{record.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{record.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Quick Follow-up */}
          <section className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm sticky top-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-5 bg-[#007A41] rounded-full" />
              <h3 className="font-bold text-gray-900">快速跟进</h3>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">跟进内容</label>
                <textarea 
                  placeholder="输入跟进详情..." 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#007A41] text-sm h-32 resize-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">跟进方式</label>
                <div className="relative">
                  <select className="w-full appearance-none px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#007A41] text-sm text-gray-600 font-medium">
                    <option>电话跟进</option>
                    <option>微信跟进</option>
                    <option>面谈跟进</option>
                    <option>邮件跟进</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">联系人</label>
                <div className="relative">
                  <select className="w-full appearance-none px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#007A41] text-sm text-gray-600 font-medium">
                    <option>{customer.contact}</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>
              <button className="w-full bg-[#007A41] text-white py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-[#007A41]/20 hover:bg-[#006335] transition-all mt-4">
                提交跟进
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function FollowUpModal({ data, type, onClose }: { data: any, type: 'lead' | 'customer', onClose: () => void }) {
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
      >
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#E6F9F0] text-[#007A41] flex items-center justify-center">
              <MessageSquare size={18} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">添加跟进</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-900 transition-colors">
            <Plus className="rotate-45" size={24} />
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-600">跟进方式 <span className="text-red-500">*</span></label>
              <div className="relative">
                <select className="w-full appearance-none px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#007A41] text-sm text-gray-600 font-medium">
                  <option>电话跟进</option>
                  <option>微信跟进</option>
                  <option>面谈跟进</option>
                  <option>邮件跟进</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-600">下次跟进时间</label>
              <div className="relative">
                <input 
                  type="datetime-local" 
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#007A41] text-sm text-gray-600 font-medium" 
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-600">联系人</label>
            <div className="relative">
              <select className="w-full appearance-none px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#007A41] text-sm text-gray-600 font-medium">
                <option>{data.contact}</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-600">跟进内容 <span className="text-red-500">*</span></label>
            <textarea 
              placeholder="请详细描述跟进情况..." 
              className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#007A41] text-sm text-gray-600 font-medium h-40 resize-none"
            />
          </div>

          <div className="bg-[#FFF9F2] p-4 rounded-xl flex items-start gap-3 border border-[#FFE8CC]">
            <HelpCircle size={16} className="text-[#FF922B] shrink-0 mt-0.5" />
            <p className="text-[11px] text-[#D9480F] leading-relaxed font-medium">
              温馨提示：详细的跟进记录有助于团队协作和后续复盘，建议包含客户关注点、待办事项及明确的下一步计划。
            </p>
          </div>
        </div>

        <div className="px-8 py-6 border-t border-gray-100 flex items-center justify-end gap-4 bg-gray-50/30">
          <button onClick={onClose} className="px-8 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">取消</button>
          <button onClick={onClose} className="bg-[#007A41] text-white px-10 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-[#007A41]/20 hover:bg-[#006335] transition-all">提交</button>
        </div>
      </motion.div>
    </div>
  );
}

function AddCustomerModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">新建客户</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-900 transition-colors">
            <Plus className="rotate-45" size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-10">
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-5 bg-[#007A41] rounded-full" />
              <h4 className="font-bold text-gray-900">基本信息</h4>
            </div>

            <div className="grid grid-cols-2 gap-x-12 gap-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">客户名称 <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input type="text" placeholder="输入客户名称" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#007A41] text-sm" />
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">客户来源</label>
                <div className="relative">
                  <select className="w-full appearance-none px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#007A41] text-sm text-gray-500">
                    <option>请选择来源</option>
                    <option>官网咨询</option>
                    <option>线下展会</option>
                    <option>线上推广</option>
                    <option>转介绍</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">企业Logo</label>
                <div className="border-2 border-dashed border-gray-100 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer h-[160px]">
                  <div className="w-10 h-10 rounded-xl bg-[#E6F9F0] text-[#007A41] flex items-center justify-center">
                    <Plus size={20} />
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-bold text-gray-500">点击上传或拖拽图片</p>
                    <p className="text-[8px] text-gray-300 mt-1 uppercase tracking-widest">JPG, PNG (Max 2MB)</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">负责人 <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <input type="text" value="admin" readOnly className="w-full px-4 py-2.5 bg-gray-100 border border-gray-100 rounded-xl outline-none text-sm text-gray-600" />
                    <User className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">手机 <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="输入手机号" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#007A41] text-sm" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">客户行业</label>
                <div className="relative">
                  <select className="w-full appearance-none px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#007A41] text-sm text-gray-500">
                    <option>选择行业</option>
                    <option>IT/软件</option>
                    <option>制造业</option>
                    <option>金融业</option>
                    <option>教育培训</option>
                  </select>
                  <LayoutGrid className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">邮箱</label>
                <input type="email" placeholder="example@company.com" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#007A41] text-sm" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">下次联系时间</label>
                <div className="relative">
                  <input type="date" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#007A41] text-sm" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">客户级别</label>
                <div className="relative">
                  <select className="w-full appearance-none px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#007A41] text-sm text-gray-500">
                    <option>选择级别</option>
                    <option>A (重点客户)</option>
                    <option>B (普通客户)</option>
                    <option>C (一般客户)</option>
                  </select>
                  <Star className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-5 bg-[#007A41] rounded-full" />
              <h4 className="font-bold text-gray-900">详细信息</h4>
            </div>
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">详细地址</label>
                <input type="text" placeholder="请输入详细地址" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#007A41] text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">备注</label>
                <textarea placeholder="请输入备注信息..." className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#007A41] text-sm h-32 resize-none" />
              </div>
            </div>
          </section>
        </div>

        <div className="px-8 py-6 border-t border-gray-100 flex items-center justify-end gap-4 bg-gray-50/30">
          <button onClick={onClose} className="px-8 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">取消</button>
          <button onClick={onClose} className="bg-[#007A41] text-white px-10 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-[#007A41]/20 hover:bg-[#006335] transition-all">保存</button>
        </div>
      </motion.div>
    </div>
  );
}

function CustomerListView({ onAdd, onViewDetail, onFollowUp }: { onAdd: () => void, onViewDetail: (customer: any) => void, onFollowUp: (customer: any) => void }) {
  const customers = [
    { name: '阿波罗生态园林', industry: '城市景观设计', contact: '张建设', phone: '138-8821-5678', dealStatus: '未成交', level: '重要', owner: 'Chen Xiaoming', time: '2023-11-24' },
    { name: '自然动力矿业集团', industry: '矿山修复工程', contact: '刘力原', phone: '139-4412-5678', dealStatus: '成交', level: '普通', owner: 'Chen Xiaoming', time: '2023-11-20' },
    { name: '翠峰垂直农场', industry: '智慧农业', contact: '王翠翠', phone: '137-2233-5678', dealStatus: '未成交', level: '重要', owner: 'Chen Xiaoming', time: '2023-11-25' },
    { name: '绿野环境咨询', industry: '环保合规咨询', contact: '赵野', phone: '152-9900-5678', dealStatus: '未成交', level: '普通', owner: 'Chen Xiaoming', time: '2023-11-15' },
    { name: '墨翠景观装饰', industry: '室内垂直绿化', contact: '钱翠墨', phone: '186-5544-5678', dealStatus: '未成交', level: '重要', owner: 'Chen Xiaoming', time: '2023-11-26' },
  ];

  return (
    <>
      <nav className="flex items-center gap-2 text-[11px] text-gray-400 mb-2 font-medium">
        <span>CRM</span>
        <span className="text-gray-300">/</span>
        <span className="text-[#007A41]">客户管理</span>
        <span className="text-gray-300">/</span>
        <span className="text-[#007A41]">客户</span>
      </nav>

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">客户管理列表</h2>
        <button 
          onClick={onAdd}
          className="bg-[#007A41] text-white px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-[#006335] transition-all shadow-sm font-semibold text-sm"
        >
          <Plus size={18} />
          <span>新增客户</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {[
          { label: '客户总数', value: '1,284', icon: Users, trend: '+12.5%', trendColor: 'text-[#00C068]', bgColor: 'bg-[#E6F9F0]' },
          { label: '关键客户', value: '312', icon: Star, trend: '关键目标', trendColor: 'text-[#FF922B]', bgColor: 'bg-[#FFF9F2]' },
          { label: '今日跟进', value: '18', icon: Calendar, trend: '今日新增', trendColor: 'text-[#4E8DFF]', bgColor: 'bg-[#EBF2FF]' },
          { label: '转化率', value: '24.5%', icon: BarChart3, trend: '行业领先', trendColor: 'text-[#00C068]', bgColor: 'bg-[#E6F9F0]' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon size={20} className={stat.trendColor} />
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${stat.bgColor} ${stat.trendColor}`}>
                {stat.trend}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
            <p className="text-xs text-gray-400 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filter Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <select className="appearance-none bg-white border border-gray-100 rounded-xl px-5 py-2.5 pr-10 text-sm outline-none focus:ring-2 focus:ring-[#007A41] text-gray-600 font-medium">
              <option>客户级别: 全部</option>
              <option>重要客户</option>
              <option>普通客户</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
          <div className="relative">
            <select className="appearance-none bg-white border border-gray-100 rounded-xl px-5 py-2.5 pr-10 text-sm outline-none focus:ring-2 focus:ring-[#007A41] text-gray-600 font-medium">
              <option>所属行业: 全部</option>
              <option>IT/软件</option>
              <option>制造业</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
        </div>
        <div className="text-[11px] text-gray-400 font-medium">
          共筛选出 <span className="text-gray-900 font-bold">1,284</span> 个客户
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden relative">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F9FAFB] border-b border-gray-100">
              <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">客户名称</th>
              <th className="px-4 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">所属行业</th>
              <th className="px-4 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">联系人</th>
              <th className="px-4 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">手机号码</th>
              <th className="px-4 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">成交状态</th>
              <th className="px-4 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">客户级别</th>
              <th className="px-4 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">负责人</th>
              <th className="px-4 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">最后跟进</th>
              <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {customers.map((customer, i) => (
              <tr 
                key={i} 
                onClick={() => onViewDetail(customer)}
                className="hover:bg-gray-50 transition-colors group cursor-pointer"
              >
                <td className="px-8 py-6">
                  <div className="font-bold text-gray-900 text-sm">{customer.name}</div>
                </td>
                <td className="px-4 py-6 text-sm text-gray-500 font-medium">{customer.industry}</td>
                <td className="px-4 py-6 text-sm text-gray-600 font-medium">{customer.contact}</td>
                <td className="px-4 py-6 text-sm text-gray-600 tabular-nums font-medium">{customer.phone}</td>
                <td className="px-4 py-6">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold ${
                    customer.dealStatus === '成交' ? 'bg-[#E6F9F0] text-[#00C068]' : 'bg-[#FFF9F2] text-[#FF922B]'
                  }`}>
                    {customer.dealStatus}
                  </span>
                </td>
                <td className="px-4 py-6">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold ${
                    customer.level === '重要' ? 'bg-[#FFF9F2] text-[#FF922B]' : 'bg-[#E6F9F0] text-[#00C068]'
                  }`}>
                    {customer.level}
                  </span>
                </td>
                <td className="px-4 py-6">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden">
                      <img src={`https://picsum.photos/seed/${customer.owner}/40/40`} alt={customer.owner} referrerPolicy="no-referrer" />
                    </div>
                    <span className="text-xs text-gray-600 font-medium">{customer.owner}</span>
                  </div>
                </td>
                <td className="px-4 py-6 text-sm text-gray-400 font-medium">{customer.time}</td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewDetail(customer);
                      }}
                      className="text-[#007A41] text-xs font-bold hover:underline"
                    >
                      详情
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onFollowUp(customer);
                      }}
                      className="text-[#007A41] text-xs font-bold hover:underline"
                    >
                      跟进
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Pagination */}
        <div className="px-8 py-5 bg-[#F9FAFB] border-t border-gray-100 flex items-center justify-between">
          <div className="text-[11px] text-gray-400 font-medium">
            显示第 <span className="text-gray-900">1</span> 到 <span className="text-gray-900">5</span> 条，共 1,284 条客户
          </div>
          <div className="flex items-center gap-2.5">
            <button className="p-1.5 text-gray-300 hover:text-gray-900 disabled:opacity-30 transition-colors" disabled>&lt;</button>
            {[1, 2, 3, '...', 128].map((page, i) => (
              <button 
                key={i}
                className={`w-8 h-8 rounded-lg text-[11px] font-bold transition-all ${
                  page === 1 ? 'bg-[#007A41] text-white shadow-lg shadow-[#007A41]/20' : 'text-gray-400 hover:bg-gray-200'
                }`}
              >
                {page}
              </button>
            ))}
            <button className="p-1.5 text-gray-300 hover:text-gray-900 transition-colors">&gt;</button>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={onAdd}
        className="fixed bottom-10 right-10 w-14 h-14 bg-[#007A41] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-30"
      >
        <Plus size={28} />
      </button>
    </>
  );
}

function OrdersView({ onAdd, onViewDetail, onAdvance }: { onAdd: () => void, onViewDetail: (order: any) => void, onAdvance: (order: any) => void }) {
  const orders = [
    { id: '#ORD-2024-8802', customer: 'TechNexus Global Ltd.', opportunity: 'Q4 Infrastructure Upgrade', amount: '452,000.00', status: '新建', time: '2023-11-24 14:20' },
    { id: '#ORD-2024-8795', customer: 'Horizon FinTech Corp.', opportunity: 'Cloud Migration Phase II', amount: '1,280,000.00', status: '已确认', time: '2023-11-23 09:15' },
    { id: '#ORD-2024-8780', customer: 'Stellar Dynamics', opportunity: 'Security Audit Services', amount: '85,500.00', status: '已取消', time: '2023-11-21 16:45' },
    { id: '#ORD-2024-8772', customer: 'Apex Manufacturing', opportunity: 'Hardware Procurement', amount: '2,340,000.00', status: '已确认', time: '2023-11-20 11:30' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-wider">
            <span>主页</span>
            <ChevronRight size={12} />
            <span className="text-gray-900">订单管理</span>
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
            订单管理
            <div className="w-2 h-2 bg-[#22c55e] rounded-full mt-4"></div>
          </h1>
        </div>
        <button 
          onClick={onAdd}
          className="bg-[#22c55e] text-white px-8 py-3.5 rounded-2xl font-bold text-sm shadow-xl shadow-[#22c55e]/20 hover:bg-[#16a34a] transition-all flex items-center gap-3 active:scale-95"
        >
          <Plus size={20} />
          新建订单
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-6">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative">
            <select className="appearance-none pl-12 pr-10 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold text-gray-600 focus:ring-2 focus:ring-[#22c55e] outline-none transition-all">
              <option>全部状态</option>
              <option>新建</option>
              <option>已确认</option>
              <option>已取消</option>
            </select>
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold uppercase">状态:</div>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
          <div className="relative">
            <select className="appearance-none pl-12 pr-10 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold text-gray-600 focus:ring-2 focus:ring-[#22c55e] outline-none transition-all">
              <option>最近 30 天</option>
              <option>最近 90 天</option>
              <option>本年度</option>
            </select>
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold uppercase">时间段:</div>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
        </div>
        <button className="text-gray-400 hover:text-[#22c55e] transition-colors flex items-center gap-2 text-sm font-bold">
          <Filter size={16} />
          更多筛选条件
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F9FAFB] border-b border-gray-100">
              <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">订单编号</th>
              <th className="px-4 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">客户名称</th>
              <th className="px-4 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">关联商机</th>
              <th className="px-4 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">金额 ( ¥ )</th>
              <th className="px-4 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">状态</th>
              <th className="px-4 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">最后更新</th>
              <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {orders.map((order, idx) => (
              <tr key={idx} className="hover:bg-gray-50/50 transition-colors group cursor-pointer" onClick={() => onViewDetail(order)}>
                <td className="px-8 py-6">
                  <span className="text-sm font-bold text-[#22c55e] hover:underline">{order.id}</span>
                </td>
                <td className="px-4 py-6">
                  <p className="text-sm font-black text-gray-900">{order.customer}</p>
                </td>
                <td className="px-4 py-6">
                  <p className="text-xs font-bold text-gray-400">{order.opportunity}</p>
                </td>
                <td className="px-4 py-6">
                  <p className="text-sm font-black text-gray-900 tabular-nums tracking-tight">{order.amount}</p>
                </td>
                <td className="px-4 py-6">
                  <div className="flex justify-center">
                    <span className={`inline-flex flex-col items-center justify-center w-10 h-10 rounded-xl text-[10px] font-bold leading-tight ${
                      order.status === '新建' ? 'bg-[#E6F9F0] text-[#00C068]' :
                      order.status === '已确认' ? 'bg-[#22c55e] text-white' :
                      'bg-red-50 text-red-500'
                    }`}>
                      {order.status.split('').map((char, i) => <span key={i}>{char}</span>)}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-6 text-[10px] text-gray-400 font-bold tabular-nums leading-relaxed">
                  {order.time.split(' ').map((t, i) => <div key={i}>{t}</div>)}
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-4">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onAdvance(order);
                      }}
                      className="text-[#22c55e] text-xs font-bold hover:underline"
                    >
                      推进
                    </button>
                    <button 
                      onClick={() => onViewDetail(order)}
                      className="text-[#22c55e] text-xs font-bold flex items-center gap-1 hover:underline"
                    >
                      详情
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="px-8 py-6 bg-[#F9FAFB] border-t border-gray-100 flex items-center justify-between">
          <div className="text-[11px] text-gray-400 font-bold tracking-wider uppercase">
            1 <span className="mx-2 opacity-20">|</span> 4 <span className="mx-2 opacity-20">|</span> 128
          </div>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors">&lt;</button>
            <button className="w-8 h-8 rounded-lg bg-[#22c55e] text-white text-[11px] font-bold shadow-lg shadow-[#22c55e]/20">1</button>
            <button className="w-8 h-8 rounded-lg text-gray-400 hover:bg-gray-200 text-[11px] font-bold transition-all">2</button>
            <button className="w-8 h-8 rounded-lg text-gray-400 hover:bg-gray-200 text-[11px] font-bold transition-all">3</button>
            <span className="text-gray-300">...</span>
            <button className="w-8 h-8 rounded-lg text-gray-400 hover:bg-gray-200 text-[11px] font-bold transition-all">32</button>
            <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors">&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AddOrderModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
      >
        <div className="px-8 py-6 flex items-center justify-between border-b border-gray-50">
          <h3 className="text-xl font-bold text-gray-900">新建订单</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-900 transition-colors font-bold text-sm">取消</button>
        </div>

        <div className="p-8 space-y-6 overflow-y-auto max-h-[70vh]">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500">订单标题 <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              placeholder="请输入订单标题" 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#22c55e] text-sm font-bold" 
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">客户名称 <span className="text-red-500">*</span></label>
              <div className="relative">
                <select className="w-full appearance-none pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#22c55e] text-sm font-bold">
                  <option>请选择客户</option>
                  <option>TechNexus Global Ltd.</option>
                  <option>Horizon FinTech Corp.</option>
                </select>
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">关联商机</label>
              <div className="relative">
                <select className="w-full appearance-none pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#22c55e] text-sm font-bold">
                  <option>请选择商机</option>
                  <option>Q4 Infrastructure Upgrade</option>
                  <option>Cloud Migration Phase II</option>
                </select>
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">订单金额 <span className="text-red-500">*</span></label>
              <div className="relative">
                <input 
                  type="number" 
                  placeholder="0.00" 
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#22c55e] text-sm font-bold" 
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">¥</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">下单日期 <span className="text-red-500">*</span></label>
              <div className="relative">
                <input 
                  type="date" 
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#22c55e] text-sm font-bold" 
                />
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500">负责人 <span className="text-red-500">*</span></label>
            <div className="relative">
              <select className="w-full appearance-none pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#22c55e] text-sm font-bold">
                <option>陈晓明</option>
                <option>张建国</option>
                <option>李晓丽</option>
              </select>
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500">备注</label>
            <textarea 
              placeholder="请输入备注信息..." 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#22c55e] text-sm h-32 resize-none"
            />
          </div>
        </div>

        <div className="p-8 bg-gray-50 flex items-center justify-end gap-4">
          <button onClick={onClose} className="px-8 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">取消</button>
          <button onClick={onClose} className="bg-[#22c55e] text-white px-10 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-[#22c55e]/20 hover:bg-[#16a34a] transition-all">保存</button>
        </div>
      </motion.div>
    </div>
  );
}

function OrderDetailView({ order, onBack, onEdit, onAdvance }: { order: any, onBack: () => void, onEdit: () => void, onAdvance: () => void }) {
  if (!order) return null;

  const steps = [
    { name: '新建', status: 'completed', time: '2023-11-24 14:20' },
    { name: '已确认', status: 'active', time: '2023-11-25 10:00' },
    { name: '已取消', status: 'pending' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#F9FAFB]">
      {/* Header */}
      <div className="px-8 py-6 bg-white border-b border-gray-100">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
          <button onClick={onBack} className="hover:text-[#22c55e]">CRM</button>
          <ChevronRight size={12} />
          <button onClick={onBack} className="hover:text-[#22c55e]">订单管理</button>
          <ChevronRight size={12} />
          <span className="text-gray-900 font-medium">订单详情</span>
        </div>

        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">{order.id}</h1>
              <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider ${
                order.status === '新建' ? 'bg-green-50 text-[#22c55e]' :
                order.status === '已确认' ? 'bg-[#22c55e] text-white' :
                'bg-red-50 text-red-500'
              }`}>
                {order.status}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Building2 size={14} />
                <span>{order.customer}</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="flex items-center gap-2">
                <Briefcase size={14} />
                <span>{order.opportunity}</span>
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-4">
              <span className="text-xl font-bold text-gray-400">¥</span>
              <span className="text-4xl font-black text-gray-900 tracking-tight">{order.amount}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={onAdvance}
              className="px-6 py-2 bg-[#22c55e] text-white rounded-xl text-sm font-bold shadow-lg shadow-[#22c55e]/20 hover:bg-[#16a34a] transition-all flex items-center gap-2"
            >
              推进状态
            </button>
            <button 
              onClick={onEdit}
              className="px-6 py-2 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all flex items-center gap-2"
            >
              <Edit3 size={16} />
              编辑订单
            </button>
            <button 
              className="px-6 py-2 bg-[#22c55e] text-white rounded-xl text-sm font-bold hover:bg-[#16a34a] transition-all flex items-center gap-2 shadow-lg shadow-[#22c55e]/20"
            >
              生成合同
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 space-y-6">
        {/* Progress Bar */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-6 left-0 right-0 h-1 bg-gray-100 -z-0" />
            <div className="absolute top-6 left-0 w-[40%] h-1 bg-[#22c55e] -z-0" />
            
            {steps.map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 border-white shadow-sm ${
                  step.status === 'completed' ? 'bg-[#22c55e] text-white' :
                  step.status === 'active' ? 'bg-[#10B981] text-white' :
                  'bg-white text-gray-300 border-gray-100'
                }`}>
                  {step.status === 'completed' ? <Check size={20} strokeWidth={3} /> : 
                   step.status === 'active' ? <Clock size={20} /> :
                   <Package size={20} />}
                </div>
                <div className="text-center">
                  <p className={`text-xs font-bold ${step.status === 'pending' ? 'text-gray-400' : 'text-gray-900'}`}>
                    {step.name}
                  </p>
                  {step.time && <p className="text-[8px] text-gray-400 mt-1 font-bold">{step.time}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            {/* Basic Info Card */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold text-gray-900">订单信息</h3>
                <button className="text-[#22c55e] text-xs font-bold flex items-center gap-1 hover:underline">
                  <Edit3 size={14} />
                  编辑详情
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-y-8 gap-x-12">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">订单负责人</p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#22c55e]/10 flex items-center justify-center text-xs font-bold text-[#22c55e]">陈</div>
                    <span className="text-sm font-bold text-gray-900">陈晓明</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">支付方式</p>
                  <p className="text-sm font-bold text-gray-900">银行转账 (对公)</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">下单时间</p>
                  <p className="text-sm font-bold text-gray-900">{order.time}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">预计交付日期</p>
                  <div className="flex items-center gap-2 text-[#22c55e]">
                    <Calendar size={14} />
                    <p className="text-sm font-bold">2023-12-15</p>
                  </div>
                </div>
                <div className="col-span-2 space-y-2">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">订单备注</p>
                  <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    该订单包含50台高性能计算节点及配套网络设备。客户要求在12月中旬前完成初步交付，并进行现场环境调试。已确认预付款到账。
                  </p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6">产品清单</h3>
              <div className="space-y-4">
                {[
                  { name: '高性能计算节点 H1', spec: '64核/256G/2TB NVMe', qty: 50, price: '8,500', total: '425,000' },
                  { name: '万兆交换机 S5700', spec: '48口万兆光', qty: 2, qty_unit: '台', price: '13,500', total: '27,000' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-50">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#22c55e] shadow-sm">
                        <Package size={24} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{item.name}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{item.spec}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-12 text-right">
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">单价</p>
                        <p className="text-sm font-bold text-gray-900">¥{item.price}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">数量</p>
                        <p className="text-sm font-bold text-gray-900">x{item.qty}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">小计</p>
                        <p className="text-sm font-black text-[#22c55e]">¥{item.total}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Customer Contact Card */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6">客户联系人</h3>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-50">
                <div className="w-12 h-12 rounded-full bg-[#22c55e] text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-[#22c55e]/20">
                  王
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">王经理</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">采购部负责人</p>
                </div>
                <button className="ml-auto w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#22c55e] shadow-sm hover:scale-110 transition-all">
                  <Phone size={18} />
                </button>
              </div>
            </div>

            {/* Related Documents */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6">相关文档</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-all cursor-pointer group">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileText size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">销售合同_智云科技.pdf</p>
                    <p className="text-[8px] text-gray-400 font-bold uppercase tracking-wider">已签署 • 1.2 MB</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-all cursor-pointer group">
                  <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ImageIcon size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">支付凭证_首款.jpg</p>
                    <p className="text-[8px] text-gray-400 font-bold uppercase tracking-wider">已确认 • 850 KB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EditOrderModal({ order, onClose }: { order: any, onClose: () => void }) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
      >
        <div className="px-8 py-6 flex items-center justify-between border-b border-gray-50">
          <h3 className="text-xl font-bold text-gray-900">编辑订单</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-900 transition-colors font-bold text-sm">取消</button>
        </div>

        <div className="p-8 space-y-6 overflow-y-auto max-h-[70vh]">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500">订单标题 <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              defaultValue={order.opportunity} // Assuming opportunity name as title for now
              placeholder="请输入订单标题" 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#22c55e] text-sm font-bold" 
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">客户名称 <span className="text-red-500">*</span></label>
              <div className="relative">
                <select defaultValue={order.customer} className="w-full appearance-none pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#22c55e] text-sm font-bold">
                  <option>请选择客户</option>
                  <option value="TechNexus Global Ltd.">TechNexus Global Ltd.</option>
                  <option value="Horizon FinTech Corp.">Horizon FinTech Corp.</option>
                  <option value="Stellar Dynamics">Stellar Dynamics</option>
                  <option value="Apex Manufacturing">Apex Manufacturing</option>
                </select>
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">关联商机</label>
              <div className="relative">
                <select defaultValue={order.opportunity} className="w-full appearance-none pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#22c55e] text-sm font-bold">
                  <option>请选择商机</option>
                  <option value="Q4 Infrastructure Upgrade">Q4 Infrastructure Upgrade</option>
                  <option value="Cloud Migration Phase II">Cloud Migration Phase II</option>
                  <option value="Security Audit Services">Security Audit Services</option>
                  <option value="Hardware Procurement">Hardware Procurement</option>
                </select>
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">订单金额 <span className="text-red-500">*</span></label>
              <div className="relative">
                <input 
                  type="text" 
                  defaultValue={order.amount.replace(/,/g, '')}
                  placeholder="0.00" 
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#22c55e] text-sm font-bold" 
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">¥</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">下单日期 <span className="text-red-500">*</span></label>
              <div className="relative">
                <input 
                  type="date" 
                  defaultValue={order.time.split(' ')[0]}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#22c55e] text-sm font-bold" 
                />
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500">负责人 <span className="text-red-500">*</span></label>
            <div className="relative">
              <select className="w-full appearance-none pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#22c55e] text-sm font-bold">
                <option>陈晓明</option>
                <option>张建国</option>
                <option>李晓丽</option>
              </select>
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500">备注</label>
            <textarea 
              placeholder="请输入备注信息..." 
              defaultValue="该订单包含50台高性能计算节点及配套网络设备。客户要求在12月中旬前完成初步交付，并进行现场环境调试。已确认预付款到账。"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#22c55e] text-sm h-32 resize-none"
            />
          </div>
        </div>

        <div className="p-8 bg-gray-50 flex items-center justify-end gap-4">
          <button onClick={onClose} className="px-8 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">取消</button>
          <button onClick={onClose} className="bg-[#22c55e] text-white px-10 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-[#22c55e]/20 hover:bg-[#16a34a] transition-all">保存更改</button>
        </div>
      </motion.div>
    </div>
  );
}

function ContractsView({ onAdd, onViewDetail, onAdvance }: { onAdd: () => void, onViewDetail: (contract: any) => void, onAdvance: (contract: any) => void }) {
  const contracts = [
    { id: 'CON-2024-001', orderId: '#ORD-2024-8802', customer: '北京智云科技集团', amount: '452,000.00', status: '已签署', signDate: '2023-11-25', time: '2023-11-25 10:00' },
    { id: 'CON-2024-002', orderId: '#ORD-2024-8795', customer: '未来机器人有限公司', amount: '1,280,000.00', status: '草稿', signDate: '-', time: '2023-11-24 15:30' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-wider">
            <span>商务管理</span>
            <ChevronRight size={12} />
            <span className="text-gray-900">合同管理</span>
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
            合同管理
            <div className="w-2 h-2 bg-[#22c55e] rounded-full mt-4"></div>
          </h1>
        </div>
        <button 
          onClick={onAdd}
          className="bg-[#22c55e] text-white px-8 py-3.5 rounded-2xl font-bold text-sm shadow-xl shadow-[#22c55e]/20 hover:bg-[#16a34a] transition-all flex items-center gap-3 active:scale-95"
        >
          <Plus size={20} />
          新建合同
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F9FAFB] border-b border-gray-100">
              <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">合同编号</th>
              <th className="px-4 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">关联订单</th>
              <th className="px-4 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">客户名称</th>
              <th className="px-4 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">金额 ( ¥ )</th>
              <th className="px-4 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">状态</th>
              <th className="px-4 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">签署日期</th>
              <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {contracts.map((contract, idx) => (
              <tr key={idx} className="hover:bg-gray-50/50 transition-colors group cursor-pointer" onClick={() => onViewDetail(contract)}>
                <td className="px-8 py-6">
                  <span className="text-sm font-bold text-[#22c55e] hover:underline">{contract.id}</span>
                </td>
                <td className="px-4 py-6 text-sm font-medium text-gray-500">{contract.orderId}</td>
                <td className="px-4 py-6 text-sm font-black text-gray-900">{contract.customer}</td>
                <td className="px-4 py-6 text-sm font-black text-gray-900 tabular-nums tracking-tight">{contract.amount}</td>
                <td className="px-4 py-6 text-center">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold ${
                    contract.status === '已签署' ? 'bg-[#E6F9F0] text-[#00C068]' :
                    contract.status === '草稿' ? 'bg-gray-100 text-gray-500' :
                    'bg-red-50 text-red-500'
                  }`}>
                    {contract.status}
                  </span>
                </td>
                <td className="px-4 py-6 text-xs font-bold text-gray-400">{contract.signDate}</td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-4">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onAdvance(contract);
                      }}
                      className="text-[#22c55e] text-xs font-bold hover:underline"
                    >
                      推进
                    </button>
                    <button 
                      onClick={() => onViewDetail(contract)}
                      className="text-[#22c55e] text-xs font-bold flex items-center gap-1 hover:underline"
                    >
                      详情
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PaymentsView({ onAdd, onViewDetail, onAdvance }: { onAdd: () => void, onViewDetail: (payment: any) => void, onAdvance: (payment: any) => void }) {
  const payments = [
    { id: 'PAY-2024-102', contractId: 'CON-2024-001', customer: '北京智云科技集团', amount: '226,000.00', date: '2023-11-28', status: '已回款' },
    { id: 'PAY-2024-105', contractId: 'CON-2024-001', customer: '北京智云科技集团', amount: '226,000.00', date: '-', status: '未回款' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-wider">
            <span>商务管理</span>
            <ChevronRight size={12} />
            <span className="text-gray-900">回款管理</span>
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
            回款管理
            <div className="w-2 h-2 bg-[#22c55e] rounded-full mt-4"></div>
          </h1>
        </div>
        <button 
          onClick={onAdd}
          className="bg-[#22c55e] text-white px-8 py-3.5 rounded-2xl font-bold text-sm shadow-xl shadow-[#22c55e]/20 hover:bg-[#16a34a] transition-all flex items-center gap-3 active:scale-95"
        >
          <Plus size={20} />
          新建回款
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F9FAFB] border-b border-gray-100">
              <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">回款编号</th>
              <th className="px-4 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">关联合同</th>
              <th className="px-4 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">客户名称</th>
              <th className="px-4 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">金额 ( ¥ )</th>
              <th className="px-4 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">状态</th>
              <th className="px-4 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">回款日期</th>
              <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {payments.map((payment, idx) => (
              <tr key={idx} className="hover:bg-gray-50/50 transition-colors group cursor-pointer" onClick={() => onViewDetail(payment)}>
                <td className="px-8 py-6">
                  <span className="text-sm font-bold text-[#22c55e] hover:underline">{payment.id}</span>
                </td>
                <td className="px-4 py-6 text-sm font-medium text-gray-500">{payment.contractId}</td>
                <td className="px-4 py-6 text-sm font-black text-gray-900">{payment.customer}</td>
                <td className="px-4 py-6 text-sm font-black text-gray-900 tabular-nums tracking-tight">{payment.amount}</td>
                <td className="px-4 py-6 text-center">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold ${
                    payment.status === '已回款' ? 'bg-[#E6F9F0] text-[#00C068]' :
                    payment.status === '部分回款' ? 'bg-orange-50 text-orange-500' :
                    'bg-gray-100 text-gray-500'
                  }`}>
                    {payment.status}
                  </span>
                </td>
                <td className="px-4 py-6 text-xs font-bold text-gray-400">{payment.date}</td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-4">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onAdvance(payment);
                      }}
                      className="text-[#22c55e] text-xs font-bold hover:underline"
                    >
                      推进
                    </button>
                    <button 
                      onClick={() => onViewDetail(payment)}
                      className="text-[#22c55e] text-xs font-bold flex items-center gap-1 hover:underline"
                    >
                      详情
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function InvoicesView({ onAdd, onViewDetail, onAdvance }: { onAdd: () => void, onViewDetail: (invoice: any) => void, onAdvance: (invoice: any) => void }) {
  const invoices = [
    { id: 'INV-2024-442', customer: '北京智云科技集团', ref: 'CON-2024-001', amount: '452,000.00', date: '2023-11-29', status: '已开' },
    { id: 'INV-2024-445', customer: '未来机器人有限公司', ref: '#ORD-2024-8795', amount: '1,280,000.00', date: '-', status: '未开' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-wider">
            <span>商务管理</span>
            <ChevronRight size={12} />
            <span className="text-gray-900">发票管理</span>
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
            发票管理
            <div className="w-2 h-2 bg-[#22c55e] rounded-full mt-4"></div>
          </h1>
        </div>
        <button 
          onClick={onAdd}
          className="bg-[#22c55e] text-white px-8 py-3.5 rounded-2xl font-bold text-sm shadow-xl shadow-[#22c55e]/20 hover:bg-[#16a34a] transition-all flex items-center gap-3 active:scale-95"
        >
          <Plus size={20} />
          新建发票
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F9FAFB] border-b border-gray-100">
              <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">发票编号</th>
              <th className="px-4 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">客户名称</th>
              <th className="px-4 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">关联订单/合同</th>
              <th className="px-4 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">金额 ( ¥ )</th>
              <th className="px-4 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">状态</th>
              <th className="px-4 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">开票时间</th>
              <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {invoices.map((invoice, idx) => (
              <tr key={idx} className="hover:bg-gray-50/50 transition-colors group cursor-pointer" onClick={() => onViewDetail(invoice)}>
                <td className="px-8 py-6">
                  <span className="text-sm font-bold text-[#22c55e] hover:underline">{invoice.id}</span>
                </td>
                <td className="px-4 py-6 text-sm font-black text-gray-900">{invoice.customer}</td>
                <td className="px-4 py-6 text-sm font-medium text-gray-500">{invoice.ref}</td>
                <td className="px-4 py-6 text-sm font-black text-gray-900 tabular-nums tracking-tight">{invoice.amount}</td>
                <td className="px-4 py-6 text-center">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold ${
                    invoice.status === '已开' ? 'bg-[#E6F9F0] text-[#00C068]' :
                    invoice.status === '未开' ? 'bg-gray-100 text-gray-500' :
                    'bg-red-50 text-red-500'
                  }`}>
                    {invoice.status}
                  </span>
                </td>
                <td className="px-4 py-6 text-xs font-bold text-gray-400">{invoice.date}</td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-4">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onAdvance(invoice);
                      }}
                      className="text-[#22c55e] text-xs font-bold hover:underline"
                    >
                      推进
                    </button>
                    <button 
                      onClick={() => onViewDetail(invoice)}
                      className="text-[#22c55e] text-xs font-bold flex items-center gap-1 hover:underline"
                    >
                      详情
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ContractDetailView({ contract, onBack, onAdvance }: { contract: any, onBack: () => void, onAdvance: () => void }) {
  if (!contract) return null;

  return (
    <div className="flex flex-col h-full bg-[#F9FAFB]">
      <div className="px-8 py-6 bg-white border-b border-gray-100">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
          <button onClick={onBack} className="hover:text-[#22c55e]">商务管理</button>
          <ChevronRight size={12} />
          <button onClick={onBack} className="hover:text-[#22c55e]">合同管理</button>
          <ChevronRight size={12} />
          <span className="text-gray-900 font-medium">合同详情</span>
        </div>

        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">{contract.id}</h1>
              <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider ${
                contract.status === '已签署' ? 'bg-[#E6F9F0] text-[#00C068]' : 'bg-gray-100 text-gray-500'
              }`}>
                {contract.status}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Building2 size={14} />
                <span>{contract.customer}</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="flex items-center gap-2">
                <Package size={14} />
                <span>关联订单: {contract.orderId}</span>
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-4">
              <span className="text-xl font-bold text-gray-400">¥</span>
              <span className="text-4xl font-black text-gray-900 tracking-tight">{contract.amount}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={onAdvance}
              className="px-6 py-2 bg-[#22c55e] text-white rounded-xl text-sm font-bold shadow-lg shadow-[#22c55e]/20 hover:bg-[#16a34a] transition-all flex items-center gap-2"
            >
              推进状态
            </button>
            <button 
              className="px-6 py-2 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all flex items-center gap-2"
            >
              <Edit3 size={16} />
              编辑合同
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-6">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-8">合同基本信息</h3>
              <div className="grid grid-cols-2 gap-y-8 gap-x-12">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">签署日期</p>
                  <p className="text-sm font-bold text-gray-900">{contract.signDate}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">有效期</p>
                  <p className="text-sm font-bold text-gray-900">2023-11-25 至 2024-11-24</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">合同类型</p>
                  <p className="text-sm font-bold text-gray-900">销售合同</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">负责人</p>
                  <p className="text-sm font-bold text-gray-900">陈晓明</p>
                </div>
                <div className="col-span-2 pt-4 border-t border-gray-50">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">合同条款摘要</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    本合同涉及软件系统开发与部署服务。付款方式为 3-4-3 模式：预付30%，交付后支付40%，验收合格后支付30%。
                    包含一年的免费技术支持与维护服务。
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6">相关附件</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border border-gray-100 rounded-2xl flex items-center gap-4 hover:border-[#22c55e] transition-all cursor-pointer group">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileText size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">正式签署合同扫描件.pdf</p>
                    <p className="text-[10px] text-gray-400 font-bold">4.2 MB • 2023-11-26</p>
                  </div>
                  <Download size={16} className="text-gray-300 group-hover:text-[#22c55e]" />
                </div>
                <div className="p-4 border border-gray-100 rounded-2xl flex items-center gap-4 hover:border-[#22c55e] transition-all cursor-pointer group">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileText size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">技术附件-规格说明.docx</p>
                    <p className="text-[10px] text-gray-400 font-bold">1.5 MB • 2023-11-25</p>
                  </div>
                  <Download size={16} className="text-gray-300 group-hover:text-[#22c55e]" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6">合同状态</h3>
              <div className="space-y-6 relative">
                <div className="absolute top-0 bottom-0 left-4 w-0.5 bg-gray-50" />
                {[
                  { title: '合同已签署', time: '2023-11-25 14:30', desc: '双方已完成电子签章', active: true },
                  { title: '法务审核通过', time: '2023-11-24 11:00', desc: '合同条款符合公司规范' },
                  { title: '合同草稿创建', time: '2023-11-24 09:00', desc: '由销售陈晓明发起' },
                ].map((item, idx) => (
                  <div key={idx} className="relative z-10 flex gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-4 border-white shadow-sm ${
                      item.active ? 'bg-[#22c55e] text-white' : 'bg-gray-200 text-gray-400'
                    }`}>
                      <Check size={14} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-gray-900">{item.title}</p>
                      <p className="text-[10px] text-gray-400 font-bold mt-0.5">{item.time}</p>
                      <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PaymentDetailView({ payment, onBack, onAdvance }: { payment: any, onBack: () => void, onAdvance: () => void }) {
  if (!payment) return null;

  return (
    <div className="flex flex-col h-full bg-[#F9FAFB]">
      <div className="px-8 py-6 bg-white border-b border-gray-100">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
          <button onClick={onBack} className="hover:text-[#22c55e]">商务管理</button>
          <ChevronRight size={12} />
          <button onClick={onBack} className="hover:text-[#22c55e]">回款管理</button>
          <ChevronRight size={12} />
          <span className="text-gray-900 font-medium">回款详情</span>
        </div>

        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">{payment.id}</h1>
              <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider ${
                payment.status === '已回款' ? 'bg-[#E6F9F0] text-[#00C068]' : 'bg-gray-100 text-gray-500'
              }`}>
                {payment.status}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Building2 size={14} />
                <span>{payment.customer}</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="flex items-center gap-2">
                <FileCheck size={14} />
                <span>关联合同: {payment.contractId}</span>
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-4">
              <span className="text-xl font-bold text-gray-400">¥</span>
              <span className="text-4xl font-black text-gray-900 tracking-tight">{payment.amount}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={onAdvance}
              className="px-6 py-2 bg-[#22c55e] text-white rounded-xl text-sm font-bold shadow-lg shadow-[#22c55e]/20 hover:bg-[#16a34a] transition-all flex items-center gap-2"
            >
              推进状态
            </button>
            <button 
              className="px-6 py-2 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all flex items-center gap-2"
            >
              <Edit3 size={16} />
              编辑回款
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-6">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-8">回款基本信息</h3>
              <div className="grid grid-cols-2 gap-y-8 gap-x-12">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">回款日期</p>
                  <p className="text-sm font-bold text-gray-900">{payment.date}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">支付方式</p>
                  <p className="text-sm font-bold text-gray-900">银行转账</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">确认人</p>
                  <p className="text-sm font-bold text-gray-900">财务-王芳</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">备注</p>
                  <p className="text-sm font-bold text-gray-900">首笔款项已确认到账</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6">关联单据</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-[#22c55e]">
                      <FileCheck size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">关联合同: {payment.contractId}</p>
                      <p className="text-[10px] text-gray-400 font-bold">北京智云科技集团 • 销售合同</p>
                    </div>
                  </div>
                  <button className="text-[#22c55e] text-xs font-bold hover:underline">查看合同</button>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-blue-500">
                      <Receipt size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">关联发票: INV-2024-442</p>
                      <p className="text-[10px] text-gray-400 font-bold">已开票 • 2023-11-29</p>
                    </div>
                  </div>
                  <button className="text-[#22c55e] text-xs font-bold hover:underline">查看发票</button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-6">回款进度</h3>
            <div className="space-y-6 relative">
              <div className="absolute top-0 bottom-0 left-4 w-0.5 bg-gray-50" />
              {[
                { title: '财务确认到账', time: '2023-11-28 16:00', desc: '确认金额: ¥226,000.00', active: true },
                { title: '客户提交支付凭证', time: '2023-11-28 10:00', desc: '凭证已上传至系统' },
                { title: '回款单据创建', time: '2023-11-27 15:00', desc: '由系统自动生成' },
              ].map((item, idx) => (
                <div key={idx} className="relative z-10 flex gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-4 border-white shadow-sm ${
                    item.active ? 'bg-[#22c55e] text-white' : 'bg-gray-200 text-gray-400'
                  }`}>
                    <Check size={14} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900">{item.title}</p>
                    <p className="text-[10px] text-gray-400 font-bold mt-0.5">{item.time}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InvoiceDetailView({ invoice, onBack, onAdvance }: { invoice: any, onBack: () => void, onAdvance: () => void }) {
  if (!invoice) return null;

  return (
    <div className="flex flex-col h-full bg-[#F9FAFB]">
      <div className="px-8 py-6 bg-white border-b border-gray-100">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
          <button onClick={onBack} className="hover:text-[#22c55e]">商务管理</button>
          <ChevronRight size={12} />
          <button onClick={onBack} className="hover:text-[#22c55e]">发票管理</button>
          <ChevronRight size={12} />
          <span className="text-gray-900 font-medium">发票详情</span>
        </div>

        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">{invoice.id}</h1>
              <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider ${
                invoice.status === '已开' ? 'bg-[#E6F9F0] text-[#00C068]' : 'bg-gray-100 text-gray-500'
              }`}>
                {invoice.status}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Building2 size={14} />
                <span>{invoice.customer}</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="flex items-center gap-2">
                <Receipt size={14} />
                <span>关联单据: {invoice.ref}</span>
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-4">
              <span className="text-xl font-bold text-gray-400">¥</span>
              <span className="text-4xl font-black text-gray-900 tracking-tight">{invoice.amount}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={onAdvance}
              className="px-6 py-2 bg-[#22c55e] text-white rounded-xl text-sm font-bold shadow-lg shadow-[#22c55e]/20 hover:bg-[#16a34a] transition-all flex items-center gap-2"
            >
              推进状态
            </button>
            <button 
              className="px-6 py-2 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all flex items-center gap-2"
            >
              <Edit3 size={16} />
              编辑发票
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-6">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-8">发票基本信息</h3>
              <div className="grid grid-cols-2 gap-y-8 gap-x-12">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">开票时间</p>
                  <p className="text-sm font-bold text-gray-900">{invoice.date}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">发票类型</p>
                  <p className="text-sm font-bold text-gray-900">增值税专用发票</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">纳税人识别号</p>
                  <p className="text-sm font-bold text-gray-900">91110108MA00XXXXXX</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">开票人</p>
                  <p className="text-sm font-bold text-gray-900">财务-李梅</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6">发票明细</h3>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-50">
                    <th className="py-4 text-[10px] font-bold text-gray-400 uppercase">项目名称</th>
                    <th className="py-4 text-[10px] font-bold text-gray-400 uppercase text-center">数量</th>
                    <th className="py-4 text-[10px] font-bold text-gray-400 uppercase text-right">单价</th>
                    <th className="py-4 text-[10px] font-bold text-gray-400 uppercase text-right">金额</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  <tr>
                    <td className="py-4 text-sm font-bold text-gray-900">软件开发服务费</td>
                    <td className="py-4 text-sm text-gray-600 text-center">1</td>
                    <td className="py-4 text-sm text-gray-600 text-right">¥400,000.00</td>
                    <td className="py-4 text-sm font-bold text-gray-900 text-right">¥400,000.00</td>
                  </tr>
                  <tr>
                    <td className="py-4 text-sm font-bold text-gray-900">技术咨询费</td>
                    <td className="py-4 text-sm text-gray-600 text-center">1</td>
                    <td className="py-4 text-sm text-gray-600 text-right">¥52,000.00</td>
                    <td className="py-4 text-sm font-bold text-gray-900 text-right">¥52,000.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-6">邮寄信息</h3>
            <div className="space-y-6">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">收件人</p>
                <p className="text-sm font-bold text-gray-900">王经理</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">联系电话</p>
                <p className="text-sm font-bold text-gray-900">138-XXXX-8888</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">邮寄地址</p>
                <p className="text-sm font-bold text-gray-900">北京市海淀区中关村软件园 10 号楼</p>
              </div>
              <div className="pt-4 border-t border-gray-50">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">快递单号</p>
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-500 text-[10px] font-bold rounded">顺丰速运</span>
                </div>
                <p className="text-sm font-bold text-[#22c55e] mt-1">SF142XXXXXXX888</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AddContractModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        <div className="px-8 py-6 flex items-center justify-between border-b border-gray-50">
          <h3 className="text-xl font-bold text-gray-900">新建合同</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-900 transition-colors font-bold text-sm">取消</button>
        </div>
        <div className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500">合同编号 <span className="text-red-500">*</span></label>
            <input type="text" placeholder="系统自动生成" disabled className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold text-gray-400 cursor-not-allowed" />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">关联订单 <span className="text-red-500">*</span></label>
              <select className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#22c55e] text-sm font-bold">
                <option>请选择订单</option>
                <option>#ORD-2024-8802</option>
                <option>#ORD-2024-8795</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">合同金额 <span className="text-red-500">*</span></label>
              <input type="number" placeholder="0.00" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#22c55e] text-sm font-bold" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500">签署日期</label>
            <input type="date" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#22c55e] text-sm font-bold" />
          </div>
        </div>
        <div className="p-8 bg-gray-50 flex items-center justify-end gap-4">
          <button onClick={onClose} className="px-8 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">取消</button>
          <button onClick={onClose} className="bg-[#22c55e] text-white px-10 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-[#22c55e]/20 hover:bg-[#16a34a] transition-all">保存</button>
        </div>
      </motion.div>
    </div>
  );
}

function AddPaymentModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        <div className="px-8 py-6 flex items-center justify-between border-b border-gray-50">
          <h3 className="text-xl font-bold text-gray-900">新建回款</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-900 transition-colors font-bold text-sm">取消</button>
        </div>
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">关联合同 <span className="text-red-500">*</span></label>
              <select className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#22c55e] text-sm font-bold">
                <option>请选择合同</option>
                <option>CON-2024-001</option>
                <option>CON-2024-002</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">回款金额 <span className="text-red-500">*</span></label>
              <input type="number" placeholder="0.00" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#22c55e] text-sm font-bold" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500">回款日期 <span className="text-red-500">*</span></label>
            <input type="date" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#22c55e] text-sm font-bold" />
          </div>
        </div>
        <div className="p-8 bg-gray-50 flex items-center justify-end gap-4">
          <button onClick={onClose} className="px-8 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">取消</button>
          <button onClick={onClose} className="bg-[#22c55e] text-white px-10 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-[#22c55e]/20 hover:bg-[#16a34a] transition-all">保存</button>
        </div>
      </motion.div>
    </div>
  );
}

function AddInvoiceModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        <div className="px-8 py-6 flex items-center justify-between border-b border-gray-50">
          <h3 className="text-xl font-bold text-gray-900">新建发票</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-900 transition-colors font-bold text-sm">取消</button>
        </div>
        <div className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500">客户名称 <span className="text-red-500">*</span></label>
            <select className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#22c55e] text-sm font-bold">
              <option>请选择客户</option>
              <option>北京智云科技集团</option>
              <option>未来机器人有限公司</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">关联订单/合同 <span className="text-red-500">*</span></label>
              <input type="text" placeholder="请输入订单或合同号" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#22c55e] text-sm font-bold" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">发票金额 <span className="text-red-500">*</span></label>
              <input type="number" placeholder="0.00" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#22c55e] text-sm font-bold" />
            </div>
          </div>
        </div>
        <div className="p-8 bg-gray-50 flex items-center justify-end gap-4">
          <button onClick={onClose} className="px-8 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">取消</button>
          <button onClick={onClose} className="bg-[#22c55e] text-white px-10 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-[#22c55e]/20 hover:bg-[#16a34a] transition-all">保存</button>
        </div>
      </motion.div>
    </div>
  );
}

function AddProductModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto text-left">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden my-8"
      >
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10 text-left">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-gray-900">新建产品</h2>
            <HelpCircle size={18} className="text-gray-300 cursor-help" />
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Plus size={24} className="rotate-45 text-gray-400" />
          </button>
        </div>

        <div className="p-8 space-y-10 max-h-[calc(100vh-200px)] overflow-y-auto text-left">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-[#22c55e]">
              <div className="w-1 h-4 bg-[#22c55e] rounded-full"></div>
              <h3 className="font-bold">基本信息</h3>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                  <span className="text-red-500">*</span> 产品名称
                </label>
                <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#22c55e]/20 focus:border-[#22c55e] transition-all font-bold text-sm" placeholder="请输入产品名称" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                  <span className="text-red-500">*</span> 产品类型
                </label>
                <div className="relative">
                  <select className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#22c55e]/20 focus:border-[#22c55e] transition-all appearance-none font-bold text-sm">
                    <option>请选择</option>
                    <option>硬件产品</option>
                    <option>软件服务</option>
                    <option>咨询服务</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                  成本价
                </label>
                <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#22c55e]/20 focus:border-[#22c55e] transition-all font-bold text-sm" placeholder="请输入成本价" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                  <span className="text-red-500">*</span> 产品单位
                </label>
                <div className="relative">
                  <select className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#22c55e]/20 focus:border-[#22c55e] transition-all appearance-none font-bold text-sm">
                    <option>请选择</option>
                    <option>台</option>
                    <option>个</option>
                    <option>套</option>
                    <option>次</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                  <span className="text-red-500">*</span> 产品编码
                </label>
                <div className="flex gap-2">
                  <input type="text" className="flex-1 px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#22c55e]/20 focus:border-[#22c55e] transition-all font-bold text-sm" placeholder="请输入产品编码" />
                  <button className="px-4 py-3 bg-white border border-gray-100 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all flex items-center gap-2">
                    <span className="text-yellow-500">⚡</span> 扫码录入
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                  <span className="text-red-500">*</span> 价格
                </label>
                <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#22c55e]/20 focus:border-[#22c55e] transition-all font-bold text-sm" placeholder="请输入价格" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                  产品描述
                </label>
                <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#22c55e]/20 focus:border-[#22c55e] transition-all font-bold text-sm" placeholder="请输入产品描述" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                  <span className="text-red-500">*</span> 负责人
                </label>
                <div className="relative">
                  <div className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl flex items-center gap-2">
                    <div className="flex items-center gap-1 px-2 py-0.5 bg-white border border-gray-100 rounded-md text-xs font-medium text-gray-600">
                      admin <Plus size={12} className="rotate-45 text-gray-400" />
                    </div>
                  </div>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                  <span className="text-red-500">*</span> 是否上下架
                </label>
                <div className="relative">
                  <select className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#22c55e]/20 focus:border-[#22c55e] transition-all appearance-none font-bold text-sm">
                    <option>请选择</option>
                    <option>上架</option>
                    <option>下架</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-2 text-[#22c55e]">
              <div className="w-1 h-4 bg-[#22c55e] rounded-full"></div>
              <h3 className="font-bold">图片信息</h3>
            </div>
            <div className="space-y-6 text-left">
              <div className="space-y-3">
                <p className="text-xs font-bold text-gray-900">产品主图</p>
                <div className="w-24 h-24 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center text-gray-400 hover:border-[#22c55e] hover:text-[#22c55e] transition-all cursor-pointer">
                  <Plus size={24} />
                </div>
                <p className="text-[10px] text-gray-400">图片建议上传：290（宽） * 220(高)</p>
              </div>
              <div className="space-y-3">
                <p className="text-xs font-bold text-gray-900">产品详情图片</p>
                <div className="w-24 h-24 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center text-gray-400 hover:border-[#22c55e] hover:text-[#22c55e] transition-all cursor-pointer">
                  <Plus size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-3 sticky bottom-0">
          <button onClick={onClose} className="px-6 py-2.5 text-sm font-bold text-gray-500 hover:bg-gray-100 rounded-xl transition-all">取消</button>
          <button className="px-8 py-2.5 bg-[#22c55e] text-white text-sm font-bold rounded-xl shadow-lg shadow-[#22c55e]/20 hover:bg-[#16a34a] transition-all">保存</button>
        </div>
      </motion.div>
    </div>
  );
}
