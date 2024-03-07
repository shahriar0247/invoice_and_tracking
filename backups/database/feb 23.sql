PGDMP                      |            invoice_and_tracking    13.14 (Debian 13.14-0+deb11u1)    16.0 C               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16384    invoice_and_tracking    DATABASE     |   CREATE DATABASE invoice_and_tracking WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C.UTF-8';
 $   DROP DATABASE invoice_and_tracking;
                postgres    false                       0    0    DATABASE invoice_and_tracking    ACL     D   GRANT ALL ON DATABASE invoice_and_tracking TO invoice_and_tracking;
                   postgres    false    3099                        2615    2200    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                postgres    false                       0    0    SCHEMA public    ACL     Q   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;
                   postgres    false    4            �            1259    24718    alembic_version    TABLE     X   CREATE TABLE public.alembic_version (
    version_num character varying(32) NOT NULL
);
 #   DROP TABLE public.alembic_version;
       public         heap    invoice_and_tracking    false    4            �            1259    16399    bill_to    TABLE     �   CREATE TABLE public.bill_to (
    id integer NOT NULL,
    name character varying(1200),
    address1 character varying(1200),
    address2 character varying(1200),
    address3 character varying(1200),
    deleted character varying(10)
);
    DROP TABLE public.bill_to;
       public         heap    invoice_and_tracking    false    4            �            1259    16397    bill_to_id_seq    SEQUENCE     �   CREATE SEQUENCE public.bill_to_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.bill_to_id_seq;
       public          invoice_and_tracking    false    203    4                       0    0    bill_to_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.bill_to_id_seq OWNED BY public.bill_to.id;
          public          invoice_and_tracking    false    202            �            1259    16388    company    TABLE     Z  CREATE TABLE public.company (
    id integer NOT NULL,
    name character varying(1200),
    address1 character varying(1200),
    address2 character varying(1200),
    address3 character varying(1200),
    tel character varying(1200),
    fax character varying(1200),
    gst character varying(1200),
    bank_details character varying(1200)
);
    DROP TABLE public.company;
       public         heap    invoice_and_tracking    false    4            �            1259    16386    company_id_seq    SEQUENCE     �   CREATE SEQUENCE public.company_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.company_id_seq;
       public          invoice_and_tracking    false    201    4                       0    0    company_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.company_id_seq OWNED BY public.company.id;
          public          invoice_and_tracking    false    200            �            1259    16493    daily__account    TABLE       CREATE TABLE public.daily__account (
    id character varying(20) NOT NULL,
    all_items character varying(500),
    description character varying(1200),
    date timestamp without time zone,
    vendor_id integer,
    bill_to_id integer,
    currency character varying(1200)
);
 "   DROP TABLE public.daily__account;
       public         heap    invoice_and_tracking    false    4            �            1259    16452    invoice    TABLE     >  CREATE TABLE public.invoice (
    id character varying(20) NOT NULL,
    bill_to_id integer,
    ship_from_id integer,
    ship_to_id integer,
    all_items character varying(1200),
    date timestamp without time zone,
    due_date timestamp without time zone,
    terms character varying(1200),
    extra_info character varying(1200),
    bl_number character varying(1200),
    bank_details character varying(1200),
    type character varying(1200),
    invoice_status character varying(1200),
    description character varying(1200),
    deleted character varying(10)
);
    DROP TABLE public.invoice;
       public         heap    invoice_and_tracking    false    4            �            1259    16432    item    TABLE        CREATE TABLE public.item (
    id integer NOT NULL,
    name character varying(1200),
    description character varying(1200),
    price real,
    currency character varying(1200),
    quantity integer,
    vendor_id integer,
    deleted character varying(10),
    vendor_cost integer
);
    DROP TABLE public.item;
       public         heap    invoice_and_tracking    false    4            �            1259    16510    item_history    TABLE     �   CREATE TABLE public.item_history (
    id character varying(20) NOT NULL,
    all_items character varying(500),
    description character varying(1200),
    date timestamp without time zone,
    deleted character varying(10)
);
     DROP TABLE public.item_history;
       public         heap    invoice_and_tracking    false    4            �            1259    16430    item_id_seq    SEQUENCE     �   CREATE SEQUENCE public.item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.item_id_seq;
       public          invoice_and_tracking    false    209    4                        0    0    item_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.item_id_seq OWNED BY public.item.id;
          public          invoice_and_tracking    false    208            �            1259    16475    purchase__order    TABLE     �  CREATE TABLE public.purchase__order (
    id character varying(20) NOT NULL,
    vendor_id integer,
    all_items character varying(500),
    invoice_id character varying(20),
    date timestamp without time zone,
    description character varying(1200),
    due_date timestamp without time zone,
    purchase_order_status character varying(1200),
    deleted character varying(10)
);
 #   DROP TABLE public.purchase__order;
       public         heap    invoice_and_tracking    false    4            �            1259    16410 	   ship_from    TABLE     �   CREATE TABLE public.ship_from (
    id integer NOT NULL,
    name character varying(1200),
    address1 character varying(1200),
    address2 character varying(1200),
    address3 character varying(1200),
    deleted character varying(10)
);
    DROP TABLE public.ship_from;
       public         heap    invoice_and_tracking    false    4            �            1259    16408    ship_from_id_seq    SEQUENCE     �   CREATE SEQUENCE public.ship_from_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.ship_from_id_seq;
       public          invoice_and_tracking    false    4    205            !           0    0    ship_from_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.ship_from_id_seq OWNED BY public.ship_from.id;
          public          invoice_and_tracking    false    204            �            1259    16421    ship_to    TABLE     �   CREATE TABLE public.ship_to (
    id integer NOT NULL,
    name character varying(1200),
    address1 character varying(1200),
    address2 character varying(1200),
    address3 character varying(1200),
    deleted character varying(10)
);
    DROP TABLE public.ship_to;
       public         heap    invoice_and_tracking    false    4            �            1259    16419    ship_to_id_seq    SEQUENCE     �   CREATE SEQUENCE public.ship_to_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.ship_to_id_seq;
       public          invoice_and_tracking    false    4    207            "           0    0    ship_to_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.ship_to_id_seq OWNED BY public.ship_to.id;
          public          invoice_and_tracking    false    206            �            1259    24710    shipment    TABLE     �  CREATE TABLE public.shipment (
    id character varying(20) NOT NULL,
    invoice_id character varying(500),
    issued_to_id integer,
    ship_from_id integer,
    ship_to_id integer,
    all_items character varying(500),
    arrival_date timestamp without time zone,
    due_date timestamp without time zone,
    terms character varying(1200),
    shipment_status character varying(1200),
    description character varying(1200),
    container_number character varying(1200),
    bl_number character varying(1200),
    shipping_details character varying(1200),
    type character varying(1200),
    deleted character varying(10),
    weight character varying(1200)
);
    DROP TABLE public.shipment;
       public         heap    invoice_and_tracking    false    4            �            1259    16443    vendor    TABLE     �   CREATE TABLE public.vendor (
    id integer NOT NULL,
    name character varying(1200),
    address1 character varying(1200),
    address2 character varying(1200),
    deleted character varying(10)
);
    DROP TABLE public.vendor;
       public         heap    invoice_and_tracking    false    4            �            1259    16441    vendor_id_seq    SEQUENCE     �   CREATE SEQUENCE public.vendor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.vendor_id_seq;
       public          invoice_and_tracking    false    4    211            #           0    0    vendor_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.vendor_id_seq OWNED BY public.vendor.id;
          public          invoice_and_tracking    false    210            e           2604    16402 
   bill_to id    DEFAULT     h   ALTER TABLE ONLY public.bill_to ALTER COLUMN id SET DEFAULT nextval('public.bill_to_id_seq'::regclass);
 9   ALTER TABLE public.bill_to ALTER COLUMN id DROP DEFAULT;
       public          invoice_and_tracking    false    203    202    203            d           2604    16391 
   company id    DEFAULT     h   ALTER TABLE ONLY public.company ALTER COLUMN id SET DEFAULT nextval('public.company_id_seq'::regclass);
 9   ALTER TABLE public.company ALTER COLUMN id DROP DEFAULT;
       public          invoice_and_tracking    false    200    201    201            h           2604    16435    item id    DEFAULT     b   ALTER TABLE ONLY public.item ALTER COLUMN id SET DEFAULT nextval('public.item_id_seq'::regclass);
 6   ALTER TABLE public.item ALTER COLUMN id DROP DEFAULT;
       public          invoice_and_tracking    false    208    209    209            f           2604    16413    ship_from id    DEFAULT     l   ALTER TABLE ONLY public.ship_from ALTER COLUMN id SET DEFAULT nextval('public.ship_from_id_seq'::regclass);
 ;   ALTER TABLE public.ship_from ALTER COLUMN id DROP DEFAULT;
       public          invoice_and_tracking    false    205    204    205            g           2604    16424 
   ship_to id    DEFAULT     h   ALTER TABLE ONLY public.ship_to ALTER COLUMN id SET DEFAULT nextval('public.ship_to_id_seq'::regclass);
 9   ALTER TABLE public.ship_to ALTER COLUMN id DROP DEFAULT;
       public          invoice_and_tracking    false    207    206    207            i           2604    16446 	   vendor id    DEFAULT     f   ALTER TABLE ONLY public.vendor ALTER COLUMN id SET DEFAULT nextval('public.vendor_id_seq'::regclass);
 8   ALTER TABLE public.vendor ALTER COLUMN id DROP DEFAULT;
       public          invoice_and_tracking    false    211    210    211                      0    24718    alembic_version 
   TABLE DATA           6   COPY public.alembic_version (version_num) FROM stdin;
    public          invoice_and_tracking    false    217   �R                 0    16399    bill_to 
   TABLE DATA           R   COPY public.bill_to (id, name, address1, address2, address3, deleted) FROM stdin;
    public          invoice_and_tracking    false    203   �R                 0    16388    company 
   TABLE DATA           f   COPY public.company (id, name, address1, address2, address3, tel, fax, gst, bank_details) FROM stdin;
    public          invoice_and_tracking    false    201   ;W                 0    16493    daily__account 
   TABLE DATA           k   COPY public.daily__account (id, all_items, description, date, vendor_id, bill_to_id, currency) FROM stdin;
    public          invoice_and_tracking    false    214   �X                 0    16452    invoice 
   TABLE DATA           �   COPY public.invoice (id, bill_to_id, ship_from_id, ship_to_id, all_items, date, due_date, terms, extra_info, bl_number, bank_details, type, invoice_status, description, deleted) FROM stdin;
    public          invoice_and_tracking    false    212   [                 0    16432    item 
   TABLE DATA           q   COPY public.item (id, name, description, price, currency, quantity, vendor_id, deleted, vendor_cost) FROM stdin;
    public          invoice_and_tracking    false    209   �v                 0    16510    item_history 
   TABLE DATA           Q   COPY public.item_history (id, all_items, description, date, deleted) FROM stdin;
    public          invoice_and_tracking    false    215   �x                 0    16475    purchase__order 
   TABLE DATA           �   COPY public.purchase__order (id, vendor_id, all_items, invoice_id, date, description, due_date, purchase_order_status, deleted) FROM stdin;
    public          invoice_and_tracking    false    213   �x       	          0    16410 	   ship_from 
   TABLE DATA           T   COPY public.ship_from (id, name, address1, address2, address3, deleted) FROM stdin;
    public          invoice_and_tracking    false    205   �x                 0    16421    ship_to 
   TABLE DATA           R   COPY public.ship_to (id, name, address1, address2, address3, deleted) FROM stdin;
    public          invoice_and_tracking    false    207   �                 0    24710    shipment 
   TABLE DATA           �   COPY public.shipment (id, invoice_id, issued_to_id, ship_from_id, ship_to_id, all_items, arrival_date, due_date, terms, shipment_status, description, container_number, bl_number, shipping_details, type, deleted, weight) FROM stdin;
    public          invoice_and_tracking    false    216   S�                 0    16443    vendor 
   TABLE DATA           G   COPY public.vendor (id, name, address1, address2, deleted) FROM stdin;
    public          invoice_and_tracking    false    211   �       $           0    0    bill_to_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.bill_to_id_seq', 21, true);
          public          invoice_and_tracking    false    202            %           0    0    company_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.company_id_seq', 7, true);
          public          invoice_and_tracking    false    200            &           0    0    item_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.item_id_seq', 16, true);
          public          invoice_and_tracking    false    208            '           0    0    ship_from_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.ship_from_id_seq', 44, true);
          public          invoice_and_tracking    false    204            (           0    0    ship_to_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.ship_to_id_seq', 24, true);
          public          invoice_and_tracking    false    206            )           0    0    vendor_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.vendor_id_seq', 4, true);
          public          invoice_and_tracking    false    210            �           2606    24722 #   alembic_version alembic_version_pkc 
   CONSTRAINT     j   ALTER TABLE ONLY public.alembic_version
    ADD CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num);
 M   ALTER TABLE ONLY public.alembic_version DROP CONSTRAINT alembic_version_pkc;
       public            invoice_and_tracking    false    217            m           2606    16407    bill_to bill_to_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.bill_to
    ADD CONSTRAINT bill_to_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.bill_to DROP CONSTRAINT bill_to_pkey;
       public            invoice_and_tracking    false    203            k           2606    16396    company company_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.company
    ADD CONSTRAINT company_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.company DROP CONSTRAINT company_pkey;
       public            invoice_and_tracking    false    201            {           2606    16500 "   daily__account daily__account_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.daily__account
    ADD CONSTRAINT daily__account_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.daily__account DROP CONSTRAINT daily__account_pkey;
       public            invoice_and_tracking    false    214            w           2606    16459    invoice invoice_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.invoice
    ADD CONSTRAINT invoice_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.invoice DROP CONSTRAINT invoice_pkey;
       public            invoice_and_tracking    false    212            }           2606    16517    item_history item_history_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.item_history
    ADD CONSTRAINT item_history_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.item_history DROP CONSTRAINT item_history_pkey;
       public            invoice_and_tracking    false    215            s           2606    16440    item item_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.item DROP CONSTRAINT item_pkey;
       public            invoice_and_tracking    false    209            y           2606    16482 $   purchase__order purchase__order_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.purchase__order
    ADD CONSTRAINT purchase__order_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.purchase__order DROP CONSTRAINT purchase__order_pkey;
       public            invoice_and_tracking    false    213            o           2606    16418    ship_from ship_from_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.ship_from
    ADD CONSTRAINT ship_from_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.ship_from DROP CONSTRAINT ship_from_pkey;
       public            invoice_and_tracking    false    205            q           2606    16429    ship_to ship_to_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.ship_to
    ADD CONSTRAINT ship_to_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.ship_to DROP CONSTRAINT ship_to_pkey;
       public            invoice_and_tracking    false    207                       2606    24717    shipment shipment_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.shipment
    ADD CONSTRAINT shipment_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.shipment DROP CONSTRAINT shipment_pkey;
       public            invoice_and_tracking    false    216            u           2606    16451    vendor vendor_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.vendor
    ADD CONSTRAINT vendor_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.vendor DROP CONSTRAINT vendor_pkey;
       public            invoice_and_tracking    false    211                  x������ � �         /  x�]T�r�8<�_�[���"����	��IPR��ʅ����R��{����-�_�#E����*�i�Lw�/���F#[���#���F���P,��A�3�#L�45N&�\����\��#��4I�	����Pb�Pq��N���;E�6��i�@��ܨ w�H�'�;A�4aI98�[o0p����p�O���Q�׼��" 3K�M̥Y � ���(Q:����绘�,ŭ�4T�B�:������)��g��j� Uw����l����x�bR��z�ku�u���z�@ [�s�6�����vu�)p��U�A�\M��q��"�I�T������fJ��	�2z�@�ܼ5U��2L�ex�H�d_�*&x�;�<R��3=2;g0�aD�0�\b�{�D��K���֖;�be_0w0�~����jӴ���㥔��r���mQ���l�ʶ{��@��(�R�������h�꜌J�vM!�oŔ���#r����)�Le�)��0���}�s`�fǻ���U�a�j���ڍ�;��[�}�9���M�C�Yqؔ��x.�s�"*�<�_؏��rߕ�=���$|w�sǈʪڗz�����eg������r�@��xlڏ���"��bj��E��i�Ybܻq����5$�,#c�d6���<f��ӓÚ�)�	�=v��:s�gW��/ly�x��T2g��]>��J�L[�MIj4�]"AK���9IM��E�8Jѓ���'�<�_|��l'��j�"�m[������=��;�᳗_�og������j��J�.w�ޗUy�a^k{�����Zԗ}8�,w��+��ۏLꚭ�8B���+��w���6��`�	FA�b��P��-_������폨�2<��X)�E��}�l[t�/�,�usx��3	���|�?ܲ��>\6RZwE[6�7<��"9�m��IYuM}�8��G��9���DrI�"�8�	91��!M�!����6B�~j��X��SS[��	)�D.��G�w��P�6�f/�.��L=�̊yаZU�sN��$���"�3��뫫���E         I  x�eQ�n�0<�W��s,l^7B�
5@��V\pb��S)_C*�U��zgggvb����v�c^7yV;��h��`Z����0m�U�3�"��]��*�q2>�	8�I�C��ĖahD���~>��>�<;+&ΐ��Tf) ��]xsC���(�F�f0�� v�QL��؂%�H�N^��Ĕ,�^�K�m �=�U�-������,�����Uk&!3"�����ZO�'	�٤М ����(9�n�� �'� c���Of�K
8�+�b3sq��C70u�6�w^ڨ�p��������ˡ����9����Ҋ�s[���1�v         k  x�͕Mo�@���+F>����7���T>$�HHMY`�Ub�mQ���5B�&DT�j|X���}�w��x�!��F־?ֲ0�jH�7	mR���o-���u�<A
�F�<�L0?s�	7<􆽁7?	�t�J28�W�;�#����3�i��h;-p�8�̎(��8x��N���a��E���4�Z'�t�#R�߆�l�<�����qe/�jǀ�*�NҲ`�<�6�~�8�k~�����9|��K@iI�����P�pf�
����l��i
-@� ��;�=��������7`4��qo}�
h{C�����@IF��ջ��oa0�`пzT@�Q����
|�MA<!	���t����k� [T�>!�|��_v�q�o��KLZyƉ��TZ�N��FT�+K�\%���{��`%8/�AE"ć:)w�UFR&O��Ǽh$�� �2��x�sNTp�*��#R*W˫@����/��u���	s�U����� ��p�I��@l1�L��6O�W;A�n�0�/�2��U�W���-Ϟ�*��%WB>�^�'�Du[�R5iI3c�R�e�*=T����_Q&�ۭ��H�+[T~_y����� 7aM�            x��]�r�X���~�U1�36�����X`�2�A.�tL�6�I�-܀��=1�"�r�$s��"@���P�A�+�r�ٗ�V���1a�)��=�I�/���mot3�?�����S�C���k7��#��G�b��:%�R�J?����Ao��}���>�%A�>�78��*H{�������>"+W�T;�������o�Իw�șO��ªbvI��$|
���_��/�Q����.;;�J�ֿ�u���9����d�e9�I���ޥ�R��3��㔋cƏ�%��F��17����F��J�$�����Q'�=X�[r��x� w�!Lk�K��wZ�Nx�eDؑ�� +�Ո*0C;�u�����V�Q'וj��V?(/8+�HpY.�&~���J~$�_���JFj���U�p�*�u�_I%�<�wq��)�������3��������F0%�ч~�gf�a7������NX��<�8 ��ǎ*�����?�푳�y�/��s��f��x��7�)�,:E�S+`������h����8�Y�;%��z��Ҩw�	�b�w��m�\-	s��%LS��k��\������}��Z�X�������)~�Jx�x��:c�5}S��z�H�B',wGc�q0�o�@�VTU�n��?^%�m ��u���*�+ŕ��s�c)\?�\��[���=���M��x��K칪��.�҉��B<�̓�_��ŋ��H�H�T"��&p����K��%Z�>Yx��y
&�&��מsݧo�I���m�'͌B&9MLrp���W���`�!����~����x�K��ZZԌ��h��D3�?�n�3r�iq��U��]�@9�4fw2��(��J�u�h�A·�����%��#��V�Yi��hSW���bi��|�6^xj�M'��z�#׏wwO�����E��R�t�����?v��$�]X��5���Vۛm����Ij��C[Q��B/���\tB&��El�:�f��O` ����:��'��_5"E���<��瑢?%������(�h��˱jzF�d�x�c�[��7f_N7�7�3^`�| �26f�.���|���:^�s�l1�`?ߟ-������R�{�����X`5�q,��9me'�I�'`X�0wBSR�_V���'!���!�c��M�C2��5��c�ciz?��	�^&JބA��X���R���_�+��sN�j��Iu*����C�`�q*���z�c��u\�d,�ݑ~H>�P��[GI29�2�]�ѕ1�QJ�O�c�W��r��/�l��  ��HAZ���h���<0Ɯ5��T{`�5�m�S�S�_��j�N�`	gc�/_�î��$��$��^+p؆zQ������O��F�ok�R�::���!�ͥ}E/���Jf\9��y8�'��z�x�x�u;	�]?d?%~Pmk���}��PÐ$�Enr�Qm���V+e�p�!I���y��(��{��1�G�rѕYtY���1 ���A�Bn�d���Ϛ�3�}��l�k��eCl"�W�ꖔF�j��a1 $�-h�Ơf)2�='sF+2'�n@141��W��ȜNh������*i��" Z��bo*;5:�H��e>�M�7�,)R��<��L�d�e+d��+��3���ŜT�ic^��E!���5{׽��7�i/Uj9�������W��p�ڿ�R���Dj�=FK�Q&���R��asd�d�jL�����ٱ$�<KP������zX6rY�ۥ"C!˜P��̶���T�g�($JU�<hR�)�C���c��&Q�u�u�Y_-H��{Vb��Hhy��c���F����Wg,ܩ����Z:�����v���BV}��Y�p6�~P fR�8����z[ə�(0�:�"`��ʂ�'0��H�����X����z�����y��j�1�T��룜�R�4?��R��L�]��z1���ԍ����ui��?��U���b�Pg$�zp�8������Y��qD����~F����͏��Is+᠎�fEM��Hk������ Ucz%%�*�d���=d^nd9�y[�^|	��S�Jb��dI�(��e�ZhE;�	S �-.��h���RF�C�h!7'���e�h:�+��r�V�]h�F���P�4>"�<ml����±b�Ǧ$��y��A�Jm��e������T��]zxob�f��|�]UW	��¿��MIlϓL��M9�~�:���j8��#���`�*.�� 3ϳ�F#F�A�\�ZM4M��y��������`�HƂ��M-ZԮ��O�*M��5���F���2�ZPkk�*��W��u�ɓ6���2%� �w���[iCYA:���L��z7��/�Uj�я�<߻\p�J=�2��+B�q
���Ex�fj/
�F뺭�3��N�*>�bLA��#?!�F��d�������w�z��@���PN%�;hh��g�YUH3	�1�,���J�H��z�{ ���[��g�H�.�-�SLbE ��u5�Q�#`m�'��T�a�;��`�b��M!ZPkKL>�x��[�ɲP��Mï�
�Y�xw��Ǻ����A��0��K�X%�?�+׵r��/��yW��+�Y�v���˯*%�'")yʆ�$iU18�'�t��9j�����.�g0�U�v$�'/ڑ�F�n��=៤T�%�b��K�b���AE���
���1�����6*�x}��4�S��6��L��d�k�q�3[9�w���pLj2�Z{���Vkki�unŵ`�kq�Ԭ�w9��a��੭r "8�S6�ca�I��teSh-1v�8K��%JI�j�XF��i�5QN@�����
���N5����K��	c R��u�k�����b��G��l�&�:��I�.��kI*��ke�l�hs�󐷣r�y�`j�������vl4}�� �]��F��9���>�?D9v̫��j��������`�$��������j��!8����I
����Z>�)s�tt���0ͥā���FY�MJp���X��ۅ��˩�J	�r1�1q� Q�����iG`ngZ�h���b�.1��H�%L�v��V�ĕ7��p��g��6�L:11Lӂe�*'7LSS�k��R�M�'��`JjU���%MR��L�15�1R�~_,"��f�W40���+�Zj*�脘\��J��\�&���SZ���a@�����f���H���*�~a
I�6Rn�e���KAPM��L�i��)��RZX���������\hLι#������ߨ6�%D\���đ�Gc����CuKr�<d����P��2�X&_ǲp�X��tp�,��-99���f����wJ�?&�܋��rB�~5J�[�h�� ��*���.��@7�b���Ix���2-����I�MI�.��"z������g����4'�C��kQNF9����I��e��.W��$���I���!�z+x7!�{G�qzq^�3�c��̈́f
��Մ?�-V�G�#�T�%��`{��;lM��;E��H�D�ad乸`���B���=��g��|S��hE�UZ������+^����	
4\��v�2���\��"JY�4�����_�J��/x�ݴ.�͐���1y�	�z~�ܻ��G�x�\.�3�$�7��L�n��� 8��;�	2�)d��.�A[jÁz҉���NhZ�6%slN~-6#,�:u���K���Q���d6A�*������%�l#�� ��(xv�������	��۠��tv�>',��>����b�C��r�v� ����N�aҝ��ic�W���A���fy���!�X�B�Y��N����g�Ǖf�^�_ ��%�7ޕ����;;��1�^��� 1��?FR�m�P�U5q3����[��~�͕u4j:ڽ��j�͗�@dģ*R*k]���mߏfYAm�q����*��cxR�EQǸ7A�o3�-j!����&��9S=������~Lt��h���
E�鷃
M �  S�z�N oQ�b��7�|�Rb��T/�˶+�\����7*�t/�E8�i8}��sx����nd�������6��a��fj T�B�BaᙍJ:w��h�(�Aq�yc୽#���!k0!�[�St���pj��B͍� ��1��i�����p�pw���	pm.H����N��N��ho,�6�8%߉5])�F	�"ѕV��F�|*�
�؇�"eN�ˆ;���"Vː��te7��rg)E����XL��1� �n7��b98Ֆ��U2�8/��Ջ�N(J͝6l�3��l�E`�U�V@U$���F����DĦ�����XK�[���7�^����W��)͌�\��D$����M���a��rkż���q8�7H!ش@)o�6���z��`��7��x~��`tfJ�yJyr����^���n���B�e�EY����PUJ�br,zDo���3��F0!#�M�ha8��	���<���w�����ύ*$�j,����#�h^҆۬BJI`r,��?o�ϣZB��S�?I�D����{�����q7����ͨp3�_R-Q/O�&���	��Ѝ�~�둿���}B����2�e��*�Z���xC"�A�����sF�B���t#t�-�Ђ�eZ�tÚ�t6��A6v_�H��'%���s��s��>w�*9��&Ud:���\����\�����$H�xV-��F�2N���ꄘ5�]^g8ϼq�*�=��m�6W��7�|[}�`�j���M�����ҷ��uA�R�~8�>~YTc��L��a�R���p�v�:Ƙݾ��"��D�t�\m&���B��Ҍ1gݱ����k.3��<�˞���?��z]�9��f��_��[P�Hq��c������V�s�sP�g�m�4�Wu�F�o[%�b<�ҡ`��i��f��3GBw��n��L�<npq�8 ��BAXb��	V�=99���������0��x����uPh|8S����w�:	.�ו��Y��#��q�����X�ЉwlMD�W�"X�6d�}/�</H���R+*������}~YcX����)�B�c���&W�.���{1��c6v�q�9inՃ����\K�	�7�X�� �8�z�IDrǄL�Qڼ�g��7Y+��-	*��>��NH��.39.����J�!9��`qS����\ 2M�چEVʂ1vM���rm�&�������'GXe�e�����VK&V�V3X�$��,'A��.���[(&��.�Q)Ҩ�&�Qm9��O��	v�)`4�Ys��O6eֆ\wo~�b�.�˕�8�M]�2��zW҆�cS��Ԯ�Z�͹�N �6��Z�$z���V�&Z'A��m
Ia
��4�+)�nB����
w�eN��y�ߕR��~�>���I� l��~A��8�K~8K�J�܆߿:���GQ�y�i�8�����;�|<+�8=OB��{2e�>)�$ԑ���~	he�1p���Y��o�2�Ϟ�Ik�Z�#�����L�s��vF��j��_�BuLX�hd*m� ~}��U��&Q_Q�QYnZ�cV@3wtG[�&��������'�h��{���B�{r_�Yt�c\if��K���֮1�Y�i�o�w=��v3��Z�`�F_{�1!�KK��$>�п����tG=x�>���p�+L��҅�dr��ݛ����ᦛ��Hۏರ4��N���q�\]���D\Y팙C�}����^���/b��)��=(�7V�N��z�e.�]�ɱX�'�'�DO�H��o+�5�ԛBME�=��M�������]�ڮ�O;c�'�1�|�Z�TuV�⼳ߨ��J�#�'�CK��Qa$�TF�/W..[�!�-��N\V��6��r�#U�����Ԃ16GT��B�Hpf{�K�Y����uC`�������Ā�\���[\�S�xզ� G�7m�a�N�# }�_�u&�p$U�q{��>EƑ����U�}���B�>�-�1�Q����Cox|��A�	��7���>L9���n�K0�~Y��̚^�Jl�>���D��Wi��9/�5+>9��Z��T#�mB�#���NNl����<j�1J�u2d���~������lM�\��󻗾o�l_�E�b��}��(6�Z3ʕ��	����s����[Ȃb�'��S���z0�tf,%?]��_���Q�B�H�%���� ��t9��di�^�xV~)�7cؠ|Ֆ�S��"+�2�?��Y4��{�:��R��TiB�d���qy��~�9��sJ�;�}�Y���5kj��_��aQ�d4��h5t콨�r��k����3��h�$�Tf����8��k^�����y�oG�a��3��)w��^n���0\�h�`�n{��
t4#8�T�ק˺p��2�7q&��Ϳ	���<�8�z��<���"�Ս[Ps����?�� �r����cW�r�n�^��ɹ�#�~H�E�K)vJ�a�/�@�|��y#���z�� ���m�`R���$9���^�m�'܆��[����s�;��5ӷZ$Ä��-5��\�x�+�T@%���NS��J[J��oݻ��q�G �{�R^	J$L,����U��m|.`I�8R{���� �
/`��gA�<��˙d�e���Jo��O	w��j����DO�_��Yl���W�H�1�_��2�U�f�ro��s�x4��:��s|�$A��$��N���ߌ���[$h5�+��rӿ,�K��L���RN�CX'yT+��7��Jl�Sx]tq,i4��9p��I�
&��*2.X$�n��4z	綻�Fòp�q4܏��
Y��70�W�J�<$L-�1ZD�9���
�R[�p6k昲n��t�[Cx.��'+���Us��)��#��τt#�i+���P���.�b���>�	5F�X�H�;�����ᬭRh��j5�dx�D�*�cCߔ/���ae�SN<��D��R�%�y	i^B����jv���p壝�����)G�o         x  x�mR[O�0~>����'��v�O�M�������@��0�4���0��I�sN�[�(R����G�������[Y1i�}�jSU�;��<�¥ge6X4{�r�k�X)��$E�V��q��O�.�wm��v��nq�>�SOꈶߨ.n"<�C�� n3�e�t{X�TժJU��1��� l���a����'n����6��p��t�d�Y� �=�Y��<O&]̒,L�3LD?�-}�!qߖ����/؞Rq��G�:�
�Ev��u�) H渖��D/%�9���D�'�@��g�4��W�n�}���})&�IAaapgt��P)�z	�������²DQa��?wI���٣������/!��^9�N��$�#            x������ � �            x������ � �      	   2  x��W�n�H}�|E�: ��E7�[�l�m�M�"-+����Dd1#Q��~ۼ͏�i��,'��l�����O�:Um�E o%�d\���_�8���T�bAn�3��cIGd�́�)��i�0vg41T�s����r�?(��gP ��:n@�1V¸pgb"��Rq����;�-��A��<�f"�68ސ�*Ţ�+An�u���ue�bMJ�;�\a��Tn�֏ŖBNu��RM�[O�#����^A�=�W�h�f�C7Vq$]�ĝ�y$T��3�H��]d-ӱz��>��7��+M6���SX�{t���b��������C9�E���%OEƱA��I��^gm�"~�&�������� ��K��Ǌ�$��~�e}*��S9�9:�*c<�^X�Ů�,yqI7�΄N���cS�q|��%�G� �0���F��q�cA2��J��4�B��%_5�G��H�p(�O�V}��o�u���L��+@�?
X�ן�u�y*��bG��F�7�#���ן�}�YW��/���Ug�b|��P�� 6;<<�49l��K���g�����O9��M�5ȃ��,�4�!]����ߟ�����{���}�+�-����b��1�|_Ӭ���_����Eu�����CuxA����Կқ�;,�	@Z�
l}���M���''�h
~%�k�>B!Y4H���:o�u�7�h˸���g �����|?���h��4NV̹��͠I&CO���44�P��qi�Y���q��,Z
Ք�o��r �$��LG�ã��H��%Y�yc�&�$���pJWW �V6˲G���aZ�J�:8��8jޅ�!��_H|�I|� ��(O�
���%6ɷ�M�?��2b2�����͟ˇ=�l[�d�%�嶮�c�yY3�B�wk�������<�لC(��ts�ƱGP!�@�  �"�H����\���e�J�P�8Z3�RR��|Ư-�?��{�D^�[i�N�dD~ fL��|�R������l�g���cE2��i��!�d ��{����N����ֈ�W�IV~���� ��3�&�ΤѪӱ�m�Q��g���Ѽ���y��&��?������%��j:�2k�d�5��ĒΥr�n� q�Fm�Mb��_$�8���B3n]=�Q-�Q(�%X���U���3��[�����=r��E]n��U�/�s��СH�i�%NZ<�eu�Dcȡө�=`
�'1 W�΍Ly�B�%�ܡ&C���=\~��[���~&H$���$��ѭq*�K��L<T��(�i�=�ym��.7��k��fS�aj�s��G�wĖ1�!S}�肶=4�kgLA�\P����E�u�n����1��Z����)�1��/�,���ǴX�wBwoc��J��."��>�tk�d�N��ٸ���b*3��h�p~������;-�ǲӥ8n"�[e�z�1v65�^OdΏ�d?aԺ�c�i��;������+�'/���e]�[����2������.�-qJ����+$���1A�d���¼~d���Mp���?�r��Ӂ�R�������o\ �0-d����B���,ˁ��#6�2g��u�&ލ��}�[�2|>�(�)��i�����9&k$~Ԩ��m�#Pp�<^,0����J̾�4��d���ʗ����K�)��o��ҐMP2=�tY���dO��=����� �5]YN���h�C4%�݆x�#����yO��s�7}��Е���<���s��\du�N%e�Q.�(���2=e���P����m���}[�<��\b��j��s���cf��#� �M�rٜ_�!��w4Eǃ�5�&��o�\w�	�5���)�z[O���k}���h%��C3��q��T��/���H��G�s��^�E�x\��5���b>n0aLc�K�{���nF� {����ӷ���2�yi�k�Ytx�����2tK���	>|_�����V"�#��6����д;Z�������ɬ�����Fe꺹�����A��s�S�d=��,�-60��6kx�2��Fkh`�2"|cQ���޻w����n'         @  x�]UKn�F]��⭂�5�G��]�l���L7)Y�lh�3&b�E�.w�*G�9r��$EYr��`w?�{���E}�Ϸ����+��R�Z�(i���B�˲'6���� ���y��WT�]W���t�,QE��b����{����I4R��LM����Ⱦ�1�^����3q������\�O���p��=u]�:B�5}s|B�>��M���9��02ԩ%�1����9�������
�k��g�wXvc,v-���:�_�j$BJS�#�=ϡ�Ҕc\�oE�[��A�=>aߞ=�c�=�]{��ĔQ�]u=8�Q"�1��Oе������=�]]=� ~:��#b?���G��8sQ���2%%��2��j��:	mB�3N`��po�T��9�2N�R�l1�3�y�r;FQ*�����HTZ�4
�b+r�e���K w"l����i�#k�ݯmW�M���c.|ڽT�ǚE>=�/U�j�0]�����6�����ޙ�����O��B@�$�#�9g�YNj�� �(t�m.��5}��ˮ�8�FS ߹�:b��e�3�*�d(`�p��qĒ����L��k!$���dɚ)R�B�h��>9�f}��Ν;u��;�D�b
�	���2F,�e\9[G"s���x�7>r<A��}}@Q?>���kS�W�4Ǿ:0��͜���$���
����Tj繶L�l̊��X��1��?奁�Ĵm(�G��_\#��g��B��� Aޟ_r�ܹ��� ��$����c<bv�#��s�k|Ş�BV�|$�"�)�!_H������J��aM�+R�V�$o��*������t"�jEf���Ltч��EL�Ҕ�3Z���ҫ��[�H#ƈvC�\u��{���6˛MF�1r˽kr#�����`v�_!gb##�V��XZ�=��H#�h����[�9{�LD+N��*&%R˔+���əE�,8.���\s����eĝ�!IW��y��q�;nC�a�'�Nd�S���;�����UO{6���\5�
S}�R=�����_z��]�׫�K�n�^+��M��3#�w͡B޵/�����עq'<d�e���4��&�����i�����CՀ���Xtu����FT�e.Q���q���v���,�ndK��snS�NW��j����&>=�]?�O�����<���;�{-˔��7�G��N�'<h�0/��^���Wl�k	'���=�>W��/���&�t:���&��y[��N&b���������嫤%}�1\_|��'�z���bv{]o���]CM���ٕ���>�h[9�         �  x��U]r�F~N�/��U�<I�	!���X� KEy���PE�K�S�W�Yr�\a[�#��#T�4���~�ѻ��E�@8���\B8���w�)�}������}5v���n������rl
�'���ӻ�R�!���N'?���_���ܞ�:��ҙC'��\}P|]l�2��p�7�R6Us,�E�0�Q��Ҳ�Y^�l��"����g��_`���P�0}�??�%ޫ0OL��q)�t�1=���(C%�q�%��B)F�-�y�\0��L�1������@bv�ȟ��ԛ�����+�/�65,u<�������"�[Z�����ϲ(�i�K,z`"?y� x��K?	����]Xݼ*�?UsI<���x�%^���T~�j�x�޹%����1i���S��K�;�Č�I�IA��XsI�j�EFfûx0]�4[s�P�|<i㗻��7���KB��o��K�N˛y�/�^P��w_�EaI���T�TzȞG�h�?�<o
����B����u��&�M������j��T�U?�f_ۍ�Tc_8�u<� M��6�4h�X��*���:/gQ����mġ�����V��~1i0cS`�k�`�u���bhE�?��l�.]��IA=�A(��,��8<׻2�'��u]�������8D����� ����<n[�қ�X߂m	No�Ʒ$�'�����9���զ*vǗ�����i��t�-=�.��t@�1�P�*`�C?vcH'�z�;G�'ahNc�{t�q�B�:Dw�i�pg¥8��e�IF��BF�a�gQ}���;ڥʃ�"�����'��}ߟVۢ�t��Bq�^q�@W0�K�������F�+=u>���mݑ�K�96����Ӯ����8u4�����g����z� ֳ         �   x�M��j�0����	D��y����Ӂv�
�	ڠ&#
{�i�F�8p���bRWMU�OW�K�Eσ﹓Z��|�>{m�֠���� !{>	&�$�:an�_B�zZP�vw��t^:�8�H-�]��ǿ	����&�g��:=[l���e��)B7~�܌`7�w%<������嫙�Nګ��E�����v�	���:k5`[���!=��߸�9�A� ��]�     